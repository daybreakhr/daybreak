import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Job, Workspace } from '@prisma/client'

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
      {
        type: 'actions',
        elements: [
          {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select an item',
              emoji: true,
            },
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'Engineering',
                  emoji: true,
                },
                value: 'value-0',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'Product',
                  emoji: true,
                },
                value: 'value-1',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'Marketing',
                  emoji: true,
                },
                value: 'value-2',
              },
            ],
            action_id: 'actionId-3',
          },
        ],
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
            text: `:wave: Hi <@${user}>, \n\n Fill out the following form fields below to refer someone you know from your network.`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'input',
          block_id: 'referalName',
          element: {
            action_id: 'fullName',
            type: 'plain_text_input',
          },
          label: {
            type: 'plain_text',
            text: 'Full Name',
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
            action_id: 'phoneNumber',
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
}
