import dayjs from 'dayjs'
import { Email } from '@prisma/client'
import { MailOutlined } from '@ant-design/icons'

import Event from './event'

export default function MailEvent(props: Email) {
  const { createdAt, subject, from } = props
  return (
    <Event
      createdAt={createdAt}
      scheduledAt={createdAt}
      title={subject}
      icon={<MailOutlined className="text-xl " style={{ color: '#FF781F' }} />}
      details={
        <p>
          Email sent by <b>{from}</b> at {dayjs(createdAt).format('HH:mm')}
        </p>
      }
    />
  )
}
