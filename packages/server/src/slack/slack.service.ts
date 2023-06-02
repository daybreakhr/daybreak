import axios from 'axios'
import { stringify } from 'qs'
import { CandidateSource } from '@prisma/client'
import { Injectable, Logger } from '@nestjs/common'

import { decrypt } from 'src/utils/encrypt'
import { PrismaService } from 'src/prisma.service'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { AffindaService } from 'src/affinda/affinda.service'
import { ReferralService } from 'src/referral/referral.service'
import { CandidateService } from 'src/candidate/candidate.service'

import { SlackViews } from './slack.views'

const slackApi = 'https://slack.com/api'

@Injectable()
export class SlackService {
  private logger = new Logger('SLACK')
  constructor(
    private affindaService: AffindaService,
    private candidateService: CandidateService,
    private prismaService: PrismaService,
    private referralService: ReferralService,
    private slackViews: SlackViews,
    private s3Service: AWSS3Service,
  ) {}

  verifyUrl(body: any) {
    return body.challenge
  }

  async getSlackSecrets(userId: string) {
    const { slackBotToken, slackBotUserId, workspaceId, uid } =
      await this.prismaService.member.findFirst({
        where: { slackUserId: userId },
      })
    if (slackBotToken) {
      const decryptedToken = await decrypt(slackBotToken)
      return {
        token: decryptedToken,
        userId,
        uid,
        botUserId: slackBotUserId,
        workspaceId,
      }
    } else {
      return { token: null, userId, botUserId: null, workspaceId, uid }
    }
  }

  async handleEvent(body: any) {
    const { type } = body.event

    if (type === 'app_home_opened') {
      const { workspaceId } = await this.getSlackSecrets(body.event.user)
      const jobs = await this.prismaService.job.findMany({
        where: { workspaceId, isPublished: true },
        orderBy: { createdAt: 'desc' },
        include: { Workspace: true },
      })

      const view = this.slackViews.homeView(body.event.user, jobs)
      await this.publishHomeView(body.event.user, view)
    } else if (type === 'file_shared') {
      const { token } = await this.getSlackSecrets(body.event.user_id)
      const fileId = body.event.file_id
      // Get file details using file.info method
      const { data } = await axios.get(
        `${slackApi}/files.info?file=${fileId}`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      const { url_private_download, name, mimetype, thumb_pdf } = data.file

      // download the resume from the private url
      const { data: file } = await axios.get<Buffer>(url_private_download, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'arraybuffer',
      })

      const fileKey = `slack/referrals/${fileId}/${name}`
      await this.s3Service.uploadS3({ file, key: fileKey, mimetype })

      if (thumb_pdf) {
        // download the thumbnail from the private url
        const { data: thumbnail } = await axios.get<Buffer>(thumb_pdf, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'arraybuffer',
        })

        const thumbnailKey = `slack/referrals/${fileId}/thumbnail.png`
        await this.s3Service.uploadS3({
          file: thumbnail,
          key: thumbnailKey,
          mimetype: 'image/png',
        })
      }
    }
  }

  async handleAction(body: any) {
    const { actions, user, type, callback_id } = JSON.parse(body.payload)

    if (actions && actions[0].action_id.match(/refer_/)) {
      await this.handleReferralModal(JSON.parse(body.payload))
    } else if (type === 'view_submission') {
      const { view } = JSON.parse(body.payload)
      if (view.callback_id === 'attach_resume') {
        this.createReferralCandidate(view, user.id)
      } else {
        await this.createReferral(view, user.id)
      }
    } else if (callback_id === 'tag_resume') {
      this.handleAttachResume(JSON.parse(body.payload))
    }
  }

  async createReferralCandidate(view: any, userId: string) {
    const { workspaceId } = await this.getSlackSecrets(userId)

    const referralId =
      view.state.values.candidate.selectCandidate.selected_option.value
    const resumeElement = view.blocks[view.blocks.length - 1].elements[1].text
    const resumeUrl = encodeURI(resumeElement.replace('<', '').split('|')[0])

    // Parse resume using Affinda
    const {
      data: affindaData,
      meta: { identifier },
    } = await this.affindaService.uploadResume(resumeUrl)

    const sortedExperiences =
      affindaData?.workExperience?.sort(
        (a, b) =>
          new Date(b.dates?.endDate ?? '').valueOf() -
          new Date(a.dates?.endDate ?? '').valueOf(),
      ) ?? []

    const education = this.candidateService.getEducationDetails(affindaData)
    const experience =
      this.candidateService.getExperienceDetails(sortedExperiences)

    // Fetch details of the referral from the 1st step of the modal
    const referral = await this.prismaService.referral.findUnique({
      where: { id: referralId },
    })
    const { firstName, lastName, jobId, email, phone, linkedInUrl, createdBy } =
      referral

    // Create candidate in the database
    const candidate = await this.prismaService.candidate.create({
      data: {
        affindaId: identifier,
        firstName,
        lastName,
        email,
        phone,
        source: CandidateSource.referral,
        linkedInUrl,
        education,
        experience,
        currentCompany: sortedExperiences[0]?.organization,
        totalYearsOfExperience: affindaData.totalYearsExperience,
        skills: affindaData.skills.map(({ name }) => name),
        Job: { connect: { id: jobId } },
        Workspace: { connect: { id: workspaceId } },
        Referral: { connect: { uid: createdBy } },
      },
    })

    // download the resume from s3 and upload to candidate directory in s3
    const { data: file } = await axios.get<Buffer>(resumeUrl, {
      responseType: 'arraybuffer',
    })

    const key = `candidate/${candidate.id}/${resumeUrl.split('/').pop()}`
    const uploadResult = await this.s3Service.uploadS3({
      file,
      key,
      mimetype: 'application/pdf',
    })

    // Add resumeUrl to candidate model
    await this.prismaService.candidate.update({
      where: { id: candidate.id },
      data: { resume: uploadResult.Location },
    })

    // Delete the referral from the database
    await this.prismaService.referral.delete({ where: { id: referralId } })

    // send notification to the user on slack
    await this.sendMessage(
      userId,
      `${firstName} ${lastName} has been added to the candidate pool. You can view the candidate profile at <${process.env.FRONTEND_URL}/candidates/${candidate.id}/profile|Daybreak App>. We will keep you posted on the update of this candidate's hiring process.`,
    )
  }

  async createReferral(view: any, userId: string) {
    const jobId = view.callback_id
    const firstName = view.state.values.referalFirstName.firstName.value
    const lastName = view.state.values.referalLastName.lastName.value
    const email = view.state.values.referalEmail.email.value
    const phone = view.state.values.referalPhone.phone.value
    const linkedInUrl = view.state.values.referalLinkedIn.linkedInUrl.value

    const { title } = await this.prismaService.job.findUnique({
      where: { id: jobId },
    })
    const { uid } = await this.getSlackSecrets(userId)

    await this.referralService.createReferral({
      firstName,
      lastName,
      email,
      phone,
      linkedInUrl,
      jobId,
      uid,
      slackUserId: userId,
    })

    await this.sendMessage(
      userId,
      `You have completed first step to refer *${firstName} ${lastName}* for the job *${title}*. Complete the final step by uploading a resume to slack and tagging the referred candidate.`,
    )
  }

  async handleReferralModal(payload: any) {
    const { actions, trigger_id, user } = payload
    const jobId = actions[0].action_id.split('_')[1]
    const modal = this.slackViews.referModal(user.id, jobId)

    const { token } = await this.getSlackSecrets(user.id)
    const args = { token, trigger_id, view: JSON.stringify(modal) }
    await axios.post(`${slackApi}/views.open`, stringify(args))

    this.logger.log('Open Refer Modal')
  }

  async handleAttachResume(payload: any) {
    const { message, trigger_id, user } = payload
    let modal

    const { botUserId } = await this.getSlackSecrets(user.id)

    if (message.files) {
      const { id: fileId, name } = message.files[0]
      const referrals = await this.prismaService.referral.findMany({
        where: { slackUserId: user.id },
      })

      modal = this.slackViews.attachResumeModal(referrals, fileId, name)
      this.logger.log('Open Attach Resume Modal')
    } else {
      modal = this.slackViews.emptyResumeModal(botUserId)
      this.logger.log('Open Empty Resume Modal')
    }

    const { token } = await this.getSlackSecrets(user.id)

    const args = { token, trigger_id, view: JSON.stringify(modal) }

    await axios.post(`${slackApi}/views.open`, stringify(args))
  }

  async sendMessage(channel: string, text: string) {
    const { token } = await this.getSlackSecrets(channel)
    const args = { token, channel, text }

    await axios.post(`${slackApi}/chat.postMessage`, stringify(args))
  }

  async publishHomeView(user: string, view: string) {
    const { token } = await this.getSlackSecrets(user)
    const args = { user_id: user, token, view }

    await axios.post(`${slackApi}/views.publish`, stringify(args))
  }
}
