import { useState } from 'react'
import dayjs from 'dayjs'
import { range } from 'lodash'
import { Button, Empty } from 'antd'
import { useParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { CalendarOutlined, MailOutlined } from '@ant-design/icons'

import { Show, Switch } from 'ui-kit'
import { fetchMembers } from 'pages/members/queries'
import ScheduleModal from './components/schedule-modal'
import { fetchCalendarEvents } from './queries'
import MailModal from './components/mail-modal'

export default function CandidateEngagement() {
  const { candidateId = '' } = useParams()
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [isMailModalOpen, setIsMailModalOpen] = useState(false)

  const [{ data, isLoading }, { data: members }] = useQueries({
    queries: [
      {
        queryKey: ['calendars', candidateId],
        queryFn: () => fetchCalendarEvents(candidateId),
      },
      { queryKey: ['members'], queryFn: fetchMembers },
    ],
  })

  function getInterviewerNames(emails: string[]) {
    return emails.map((interviewerMail) => {
      const interviewerObj = members?.find(
        ({ email }) => email === interviewerMail,
      )
      return interviewerObj?.displayName ?? interviewerObj?.email
    })
  }

  return (
    <div className="p-4 text-gray-800 bg-white shadow-md rounded-b-md">
      <div className="flex items-center mb-6 space-x-4">
        <p className="text-lg font-semibold">Candidate Engagement</p>
        <div className="flex-1" />
        <Show when={data && data.length > 0}>
          <Button
            icon={<CalendarOutlined />}
            onClick={() => setIsCalendarModalOpen(true)}
          >
            Schedule Interview
          </Button>
        </Show>

        {/* This button is hidden right now because the feature is incomplete */}
        <Show when={false}>
          <Button
            type="primary"
            icon={<MailOutlined />}
            onClick={() => setIsMailModalOpen(true)}
          >
            Send Mail
          </Button>
        </Show>
      </div>

      <Switch>
        <Switch.Match when={isLoading}>
          <div className="space-y-4">
            {range(5).map((val) => (
              <div key={val} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
                <div className="flex-1 h-6 bg-gray-100 rounded-md animate-pulse" />
              </div>
            ))}
          </div>
        </Switch.Match>

        <Switch.Match when={data?.length === 0}>
          <div className="flex items-center justify-center h-80">
            <Empty description="There is no engagement history with the candidate yet...">
              <Button onClick={() => setIsCalendarModalOpen(true)}>
                Schedule Interview
              </Button>
            </Empty>
          </div>
        </Switch.Match>

        <Switch.Match when={data}>
          {(data) => (
            <div className="space-y-6">
              {data.map(({ id, title, startTime, endTime, attendees }) => (
                <div className="flex items-center" key={id}>
                  <div className="flex items-center justify-center p-3 mr-4 rounded-full shadow bg-secondary-main">
                    <CalendarOutlined />
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
              ))}
            </div>
          )}
        </Switch.Match>
      </Switch>

      <ScheduleModal
        isModalOpen={isCalendarModalOpen}
        onCancel={() => setIsCalendarModalOpen(false)}
      />

      <MailModal
        isOpen={isMailModalOpen}
        onClose={() => setIsMailModalOpen(false)}
      />
    </div>
  )
}
