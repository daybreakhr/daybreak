import { useState } from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { Avatar } from 'antd'
import { HiChevronDown, HiMail } from 'react-icons/hi'
import type { Email } from '@prisma/client'

import useAuth from 'hooks/use-auth'
import { MemberWithUserInfo } from 'types/member'

type EmailEventProps = Email & {
  members: MemberWithUserInfo[] | undefined
}

export default function EmailEvent({
  from,
  subject,
  body,
  createdAt,
  createdBy,
  members,
}: EmailEventProps) {
  const { user } = useAuth()
  const [isBodyVisible, setIsBodyVisible] = useState(false)
  const eventCreater = members?.find(({ uid }) => uid === createdBy)

  return (
    <div>
      <div className="flex items-center mb-4 space-x-2">
        <Avatar src={eventCreater?.photoURL} />
        <p className="font-medium">
          {eventCreater?.displayName}{' '}
          {eventCreater?.uid === user?.uid ? '(you)' : ''}
        </p>
        <div className="flex-1" />
        <p className="text-xs text-gray-500">{dayjs(createdAt).fromNow()}</p>
      </div>
      <div className="p-4 rounded bg-gray-50">
        <div className="flex space-x-2">
          <div className="p-2 text-lg text-white rounded bg-primary-500/90">
            <HiMail />
          </div>
          <div>
            <p className="font-medium">Email Sent</p>
            <p className="text-xs text-gray-500">
              {dayjs(createdAt).format('DD MMM YYYY • HH:MM')}
            </p>
          </div>
        </div>

        <hr className="my-4 bg-gray-200" />

        <p className="mb-2 text-xs text-gray-500">Email Sent from {from}</p>
        <p className="mb-2 text-base font-medium">{subject}</p>

        <div
          className={clsx(
            'overflow-hidden prose transition-all',
            isBodyVisible ? 'max-h-screen mb-2' : 'max-h-0',
          )}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <button
          onClick={() => setIsBodyVisible((prev) => !prev)}
          className={clsx(
            'flex items-center space-x-1 text-xs text-gray-500 bg-transparent',
          )}
        >
          <span>read email</span>
          <HiChevronDown
            className={clsx('w-4 h-4 transition-all', {
              'rotate-180': isBodyVisible,
            })}
          />
        </button>
      </div>
    </div>
  )
}
