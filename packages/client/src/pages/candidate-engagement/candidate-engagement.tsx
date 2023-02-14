import { useMemo, useState } from 'react'
import { range } from 'lodash'
import { Button, Empty } from 'antd'
import { useParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import type { Calendar, Email } from '@prisma/client'
import { CalendarOutlined, MailOutlined } from '@ant-design/icons'

import { Show, Switch } from 'ui-kit'
import ScheduleModal from './components/schedule-modal'
import { fetchCalendarEvents, fetchEmailEvents } from './queries'
import MailModal from './components/mail-modal'
import CalendarEvent from './components/calendar-event'
import MailEvent from './components/mail-event'

export default function CandidateEngagement() {
  const { candidateId = '' } = useParams()
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [isMailModalOpen, setIsMailModalOpen] = useState(false)

  const [{ data: calendars, isLoading }, { data: emails }] = useQueries({
    queries: [
      {
        queryKey: ['calendars', candidateId],
        queryFn: () => fetchCalendarEvents(candidateId),
      },
      {
        queryKey: ['emails', candidateId],
        queryFn: () => fetchEmailEvents(candidateId),
      },
    ],
  })

  const mergeData = useMemo(() => {
    const mergedData: Array<Calendar & { type: 'calendar' }> =
      calendars?.map((calendar) => ({ ...calendar, type: 'calendar' })) ?? []

    const emailData: Array<Email & { type: 'email' }> =
      emails?.map((email) => ({ ...email, type: 'email' })) ?? []

    return [...mergedData, ...emailData].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }, [calendars, emails])

  return (
    <div className="p-4 text-gray-800 bg-white shadow-md rounded-b-md">
      <div className="flex items-center mb-6 space-x-4">
        <p className="text-lg font-semibold">Candidate Engagement</p>
        <div className="flex-1" />
        <Show when={mergeData.length > 0}>
          <Button
            icon={<CalendarOutlined />}
            onClick={() => setIsCalendarModalOpen(true)}
          >
            Schedule Interview
          </Button>
        </Show>

        <Button
          type="primary"
          icon={<MailOutlined />}
          onClick={() => setIsMailModalOpen(true)}
        >
          Send Mail
        </Button>
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

        <Switch.Match when={mergeData.length === 0}>
          <div className="flex items-center justify-center h-80">
            <Empty description="There is no engagement history with the candidate yet...">
              <Button onClick={() => setIsCalendarModalOpen(true)}>
                Schedule Interview
              </Button>
            </Empty>
          </div>
        </Switch.Match>

        <Switch.Match when={mergeData}>
          {(data) => (
            <div className="space-y-6">
              {data.map(({ type, ...rest }) => (
                <Switch key={rest.id}>
                  <Switch.Match when={type === 'calendar'}>
                    <CalendarEvent {...(rest as Calendar)} key={rest.id} />
                  </Switch.Match>
                  <Switch.Match when={type === 'email'}>
                    <MailEvent {...(rest as Email)} />
                  </Switch.Match>
                </Switch>
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
