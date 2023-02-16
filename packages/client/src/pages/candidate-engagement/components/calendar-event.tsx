import { CalendarOutlined } from '@ant-design/icons'
import { Calendar } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { fetchMembers } from 'pages/members/queries'

export default function CalendarEvent({
  title,
  startTime,
  endTime,
  attendees,
  createdAt,
}: Calendar) {
  const { data: members } = useQuery(['members'], fetchMembers)

  function getInterviewerNames(emails: string[]) {
    return emails.map((interviewerMail) => {
      const interviewerObj = members?.find(
        ({ email }) => email === interviewerMail,
      )
      return interviewerObj?.displayName ?? interviewerObj?.email
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center justify-center p-3 rounded-full shadow bg-secondary-main">
        <CalendarOutlined />
      </div>
      <div>
        <p className="text-sm font-semibold">
          {dayjs(createdAt).format('DD MMM')}
        </p>
        <p className="text-xs">{dayjs(createdAt).format('HH:mm A')}</p>
      </div>
      <p>
        <b>{title}</b> interview round scheduled on{' '}
        <i>
          {dayjs(startTime).format('DD MMM')} from{' '}
          {dayjs(startTime).format('hh:mm A')} -{' '}
          {dayjs(endTime).format('hh:mm A')}
        </i>{' '}
        with {getInterviewerNames(attendees).join(', ')}
      </p>
    </div>
  )
}
