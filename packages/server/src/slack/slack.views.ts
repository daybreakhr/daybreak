import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Job, Referral, Workspace } from '@prisma/client'

@Injectable()
export class SlackViews {
  constructor(private configService: ConfigService) {}

  homeView(user: string, jobs: (Job & { Workspace: Workspace })[]) {
    const jobsList = jobs
      .map(({ title, id, Workspace }) => [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${title}*\n <${this.configService.get('BOARDS_URL')}/${
              Workspace.slug
            }/jobs/${id}|View Details>`,
          },
          accessory: {
            type: 'button',
            action_id: `refer_${id}`,
            text: {
              type: 'plain_text',
              text: 'Refer',
              emoji: true,
            },
          },
        },
        {
          type: 'divider',
        },
      ])
      .flat()

    const blocks = [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey <@${user}>! \n\nWelcome to *Daybreak Hire*! \nFollowing are the open job positions for which you can refer someone.`,
        },
      },
      {
        type: 'divider',
      },
      ...jobsList,
    ]

    return JSON.stringify({
      type: 'home',
      callback_id: 'home_view',
      title: {
        type: 'plain_text',
        text: 'Daybreak Hire!',
      },
      blocks,
    })
  }

  referModal(user: string, jobId: string) {
    return {
      callback_id: jobId,
      title: {
        type: 'plain_text',
        text: 'Refer Someone!',
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true,
      },
      type: 'modal',
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true,
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hi <@${user}>, \n\n Fill out the following details of the candidate you want to refer.`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'input',
          block_id: 'referalFirstName',
          element: {
            action_id: 'firstName',
            type: 'plain_text_input',
          },
          label: {
            type: 'plain_text',
            text: 'First Name',
            emoji: true,
          },
        },
        {
          type: 'input',
          block_id: 'referalLastName',
          element: {
            action_id: 'lastName',
            type: 'plain_text_input',
          },
          label: {
            type: 'plain_text',
            text: 'Last Name',
            emoji: true,
          },
        },
        {
          type: 'input',
          block_id: 'referalEmail',
          element: {
            action_id: 'email',
            type: 'email_text_input',
          },
          label: {
            type: 'plain_text',
            text: 'Email Address',
            emoji: true,
          },
        },
        {
          type: 'input',
          block_id: 'referalPhone',
          element: {
            type: 'number_input',
            is_decimal_allowed: false,
            action_id: 'phone',
          },
          label: {
            type: 'plain_text',
            text: 'Phone Number',
            emoji: true,
          },
        },
        {
          type: 'input',
          block_id: 'referalLinkedIn',
          element: {
            type: 'url_text_input',
            action_id: 'linkedInUrl',
          },
          label: {
            type: 'plain_text',
            text: 'LinkedIn URL',
            emoji: true,
          },
        },
      ],
    }
  }

  emptyResumeModal(botUserId: string) {
    return {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Add Resume',
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: 'Close',
        emoji: true,
      },
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `:rotating_light:  This message doesn't have any files that can be added as resume. Send message to <@${botUserId}> with your referral's resume and use Add resume message action again.`,
          },
        },
      ],
    }
  }

  attachResumeModal(referrals: Referral[], fileId: string, fileName: string) {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET')
    const s3Url = `https://${bucketName}.s3.us-east-1.amazonaws.com`

    const fileUrl = `${s3Url}/slack/referrals/${fileId}/${fileName}`
    const thumbnailUrl = `${s3Url}/slack/referrals/${fileId}/thumbnail.png`

    return {
      type: 'modal',
      callback_id: 'attach_resume',
      title: {
        type: 'plain_text',
        text: 'Add resume',
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true,
      },
      blocks: [
        {
          type: 'input',
          block_id: 'candidate',
          element: {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select candidate',
              emoji: true,
            },
            options: referrals.map(({ id, firstName, lastName }) => ({
              text: {
                type: 'plain_text',
                text: `${firstName} ${lastName}`,
                emoji: true,
              },
              value: id,
            })),
            action_id: 'selectCandidate',
          },
          label: {
            type: 'plain_text',
            text: ':paperclip: Attach resume to candidate',
            emoji: true,
          },
        },
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: ':page_with_curl: Resume',
            emoji: true,
          },
        },
        {
          type: 'image',
          image_url: thumbnailUrl,
          alt_text: 'resume_preview',
        },
        {
          type: 'context',
          block_id: 'resumeData',
          elements: [
            {
              type: 'plain_text',
              text: fileName,
              emoji: true,
            },
            {
              type: 'mrkdwn',
              text: `<${fileUrl}|:arrow_down:  Download>`,
              verbatim: false,
            },
          ],
        },
      ],
    }
  }
}
