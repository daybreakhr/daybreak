import dayjs from 'dayjs'
import { Avatar } from 'antd'
import { Calendar } from '@prisma/client'

import { HiOutlineCalendar } from 'react-icons/hi'

import useAuth from 'hooks/use-auth'
import { MemberWithUserInfo } from 'types/member'

type CalendarEventProps = Calendar & {
  members: MemberWithUserInfo[] | undefined
}

export default function CalendarEvent({
  title,
  startTime,
  endTime,
  attendees,
  createdAt,
  createdBy,
  members,
}: CalendarEventProps) {
  const { user } = useAuth()

  function getInterviewers(emails: string[]) {
    return members?.filter(({ email }) => email && emails.includes(email))
  }

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
            <HiOutlineCalendar />
          </div>
          <div>
            <p className="font-medium">Interview Scheduled</p>
            <p className="text-xs text-gray-500">
              {dayjs(startTime).format('DD MMM YYYY • HH:MM')}
            </p>
          </div>
        </div>

        <hr className="my-4 bg-gray-200" />

        <div className="mb-4">
          <p className="text-xs text-gray-500">Title</p>
          <p className="text-base font-medium">{title}</p>
        </div>

        <div className="grid grid-cols-2 mb-4">
          <div className="space-y-0.5">
            <p className="text-xs text-gray-500">Scheduled on</p>
            <p className="text-gray-900">
              {dayjs(startTime).format('DD MMMM')}
            </p>
            <p className="text-xs text-gray-900">
              {dayjs(startTime).format('dddd')}
            </p>
          </div>

          <div className="space-y-0.5">
            <p className="text-xs text-gray-500">Time</p>
            <p>
              {dayjs(startTime).format('hh:mm A')} -{' '}
              {dayjs(endTime).format('hh:mm A')}
            </p>
            <p className="text-xs text-gray-900">
              {dayjs(endTime).diff(dayjs(startTime), 'm')} mins
            </p>
          </div>
        </div>

        <p className="mb-4 text-xs text-gray-500">Interviewer(s)</p>
        <div className="space-y-2">
          {getInterviewers(attendees)?.map(({ uid, displayName, photoURL }) => (
            <div key={uid} className="flex items-center space-x-2">
              <Avatar shape="square" src={photoURL} />
              <p className="font-medium">
                {displayName} {uid === user?.uid ? '(you)' : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
