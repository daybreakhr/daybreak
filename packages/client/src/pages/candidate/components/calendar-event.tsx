import dayjs from 'dayjs'
import type { Calendar } from '@prisma/client'
import { useSearchParams } from 'react-router-dom'
import { HiOutlineCalendar } from 'react-icons/hi'
import { DeleteOutlined } from '@ant-design/icons'
import { Avatar, Button, Modal, message } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useAuth from 'hooks/use-auth'
import { MemberWithUserInfo } from 'types/member'
import { deleteCalendarEvent } from '../queries'

type CalendarEventProps = Calendar & {
  members: MemberWithUserInfo[] | undefined
}

export default function CalendarEvent({
  id,
  title,
  startTime,
  endTime,
  attendees,
  createdAt,
  createdBy,
  members,
}: CalendarEventProps) {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') ?? ''

  function getInterviewers(emails: string[]) {
    return members?.filter(({ email }) => email && emails.includes(email))
  }

  const eventCreater = members?.find(({ uid }) => uid === createdBy)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(deleteCalendarEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['calendars', candidateId])
      message.success('Successfully deleted calendar event')
    },
  })

  function handleDelete() {
    Modal.confirm({
      title: 'Delete this calendar event?',
      content: 'This action cannot be undone',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => mutate({ id }),
      okButtonProps: { danger: true },
    })
  }

  return (
    <div>
      <div className="flex items-center mb-4 space-x-2">
        <Avatar src={eventCreater?.photoURL} />
        <p className="font-medium">
          {eventCreater?.displayName}{' '}
          {eventCreater?.uid === user?.uid ? '(you)' : ''}
        </p>
        <p className="text-xs text-gray-500">{dayjs(createdAt).fromNow()}</p>
        <div className="flex-1" />
        <Button
          danger
          type="text"
          size="small"
          onClick={handleDelete}
          icon={<DeleteOutlined className="text-xs" />}
        />
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
