import { ScheduleOutlined } from '@ant-design/icons'
import { Calendar } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { fetchMembers } from 'pages/members/queries'
import Event from './event'

export default function CalendarEvent({
  title,
  startTime,
  endTime,
  attendees,
  createdAt,
}: Calendar) {
  const { data: members } = useQuery(['members'], fetchMembers)

  function getInterviewerNames(emails: string[]) {
    const nameArray = emails
      .map((interviewerMail) => {
        const interviewerObj = members?.find(
          ({ email }) => email === interviewerMail,
        )
        return interviewerObj?.displayName ?? interviewerObj?.email
      })
      .filter((val) => val)
    return nameArray.slice(0, -1).join(',') + ' and ' + nameArray.slice(-1)
  }

  return (
    <Event
      createdAt={createdAt}
      scheduledAt={startTime}
      title={title}
      icon={
        <ScheduleOutlined className="text-xl " style={{ color: '#FF781F' }} />
      }
      details={
        <p>
          Interview round scheduled on{' '}
          <i>
            {dayjs(startTime).format('DD MMM')} from{' '}
            {dayjs(startTime).format('hh:mm A')} -{' '}
            {dayjs(endTime).format('hh:mm A')}
          </i>{' '}
          with {getInterviewerNames(attendees)}
        </p>
      }
    />
  )
}
