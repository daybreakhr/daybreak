import axios from 'axios'
import { stringify } from 'qs'
import { Injectable, Logger } from '@nestjs/common'

const view = (user: string) => {
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
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Software Engineer Backend*\n\n Opened on: 3rd April, 2023 | Recruiter: Sangam Sharma',
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
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Senior Software Engineer - Fullstack*\n\n Opened on: 3rd April, 2023 | Recruiter: Sangam Sharma',
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
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Tech Lead Manager*\n\n Opened on: 3rd April, 2023 | Recruiter: Divyanka Jaiswal',
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
    },
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

@Injectable()
export class SlackService {
  private logger = new Logger('SLACK')

  verifyUrl(body: any) {
    return body.challenge
  }

  async handleEvent(body: any) {
    const { type } = body.event

    if (type === 'app_home_opened') {
      const args = {
        user_id: body.event.user,
        token: process.env.SLACK_BOT_TOKEN,
        view: view(body.event.user),
      }

      const { data } = await axios.post(
        'https://slack.com/api/views.publish',
        stringify(args),
      )
      this.logger.log(data)
    }
  }
}
