import { Injectable } from '@nestjs/common'
import { Job } from '@prisma/client'

@Injectable()
export class SlackViews {
  homeView(user: string, jobs: Job[]) {
    const jobsList = jobs.map(({ title }) => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${title}*`,
      },
      accessory: {
        type: 'button',
        action_id: 'button_click',
        text: {
          type: 'plain_text',
          text: 'Refer',
          emoji: true,
        },
      },
    }))

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

  referModal(user: string) {
    return {
      callback_id: 'modal_view',
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
          element: {
            type: 'plain_text_input',
            action_id: 'plain_text_input-action',
          },
          label: {
            type: 'plain_text',
            text: 'Full Name',
            emoji: true,
          },
        },
        {
          type: 'input',
          element: {
            type: 'email_text_input',
            action_id: 'email_text_input-action',
          },
          label: {
            type: 'plain_text',
            text: 'Email Address',
            emoji: true,
          },
        },
        {
          type: 'input',
          element: {
            type: 'number_input',
            is_decimal_allowed: false,
            action_id: 'number_input-action',
          },
          label: {
            type: 'plain_text',
            text: 'Phone Number',
            emoji: true,
          },
        },
        {
          type: 'input',
          element: {
            type: 'url_text_input',
            action_id: 'url_text_input-action',
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
