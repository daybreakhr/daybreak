import dayjs from 'dayjs'
import { Email } from '@prisma/client'
import { MailOutlined } from '@ant-design/icons'

export default function MailEvent({ subject, createdAt }: Email) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center justify-center p-3 text-white rounded-full shadow bg-primary-main">
        <MailOutlined />
      </div>

      <div>
        <p className="text-sm font-semibold">
          {dayjs(createdAt).format('DD MMM')}
        </p>
        <p className="text-xs">{dayjs(createdAt).format('HH:mm A')}</p>
      </div>

      <p>
        Sent email with subject <b>{subject}</b>
      </p>
    </div>
  )
}
