import axios from 'axios'
import { stringify } from 'qs'
import { Injectable, Logger } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { ReferralService } from 'src/referral/referral.service'

import { SlackViews } from './slack.views'

const WORKSPACE_ID = '6317158147089f094cd4598e'
const slackApi = 'https://slack.com/api'

@Injectable()
export class SlackService {
  private logger = new Logger('SLACK')
  constructor(
    private prismaService: PrismaService,
    private referralService: ReferralService,
    private slackViews: SlackViews,
    private s3Service: AWSS3Service,
  ) {}

  verifyUrl(body: any) {
    return body.challenge
  }

  async handleEvent(body: any) {
    const { type } = body.event

    if (type === 'app_home_opened') {
      const jobs = await this.prismaService.job.findMany({
        where: { workspaceId: WORKSPACE_ID, isPublished: true },
        include: { Workspace: true },
      })

      const view = this.slackViews.homeView(body.event.user, jobs)
      await this.publishHomeView(body.event.user, view)
    } else if (type === 'file_shared') {
      const fileId = body.event.file_id
      // Get file details using file.info method
      const { data } = await axios.get(
        `${slackApi}/files.info?file=${fileId}`,
        { headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` } },
      )
      const { url_private_download, name, mimetype, thumb_pdf } = data.file

      // download the resume from the private url
      const { data: file } = await axios.get<Buffer>(url_private_download, {
        headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
        responseType: 'arraybuffer',
      })

      const fileKey = `slack/referrals/${fileId}/${name}`
      await this.s3Service.uploadS3({ file, key: fileKey, mimetype })

      if (thumb_pdf) {
        // download the thumbnail from the private url
        const { data: thumbnail } = await axios.get<Buffer>(thumb_pdf, {
          headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
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
        // @Todo: Handle resume upload
      } else {
        const jobId = view.callback_id
        const firstName = view.state.values.referalFirstName.firstName.value
        const lastName = view.state.values.referalLastName.lastName.value
        const email = view.state.values.referalEmail.email.value
        const phone = view.state.values.referalPhone.phone.value
        const linkedInUrl = view.state.values.referalLinkedIn.linkedInUrl.value

        const { title } = await this.prismaService.job.findUnique({
          where: { id: jobId },
        })

        await this.referralService.createReferral({
          firstName,
          lastName,
          email,
          phone,
          linkedInUrl,
          jobId,
          slackUserId: user.id,
        })

        await this.sendMessage(
          user.id,
          `You have completed first step to refer *${firstName} ${lastName}* for the job *${title}*. Complete the final step by uploading a resume to slack and tagging the referred candidate.`,
        )
      }
    } else if (callback_id === 'tag_resume') {
      this.handleResumeUpload(JSON.parse(body.payload))
    }
  }

  async handleReferralModal(payload: any) {
    const { actions, trigger_id, user } = payload
    const jobId = actions[0].action_id.split('_')[1]
    const modal = this.slackViews.referModal(user.id, jobId)

    const args = {
      token: process.env.SLACK_BOT_TOKEN,
      trigger_id,
      view: JSON.stringify(modal),
    }

    await axios.post(`${slackApi}/views.open`, stringify(args))

    this.logger.log('Open Refer Modal')
  }

  async handleResumeUpload(payload: any) {
    const { message, trigger_id, user } = payload
    let modal

    if (message.files) {
      const { id: fileId, name } = message.files[0]
      const referrals = await this.prismaService.referral.findMany({
        where: { slackUserId: user.id },
      })

      modal = this.slackViews.attachResumeModal(referrals, fileId, name)
      this.logger.log('Open Attach Resume Modal')
    } else {
      modal = this.slackViews.emptyResumeModal()
      this.logger.log('Open Empty Resume Modal')
    }

    const args = {
      token: process.env.SLACK_BOT_TOKEN,
      trigger_id,
      view: JSON.stringify(modal),
    }

    await axios.post(`${slackApi}/views.open`, stringify(args))
  }

  async sendMessage(channel: string, text: string) {
    const args = { token: process.env.SLACK_BOT_TOKEN, channel, text }

    await axios.post(`${slackApi}/chat.postMessage`, stringify(args))
  }

  async publishHomeView(user: string, view: string) {
    const args = { user_id: user, token: process.env.SLACK_BOT_TOKEN, view }

    await axios.post(`${slackApi}/views.publish`, stringify(args))
  }
}
