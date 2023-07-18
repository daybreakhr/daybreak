import { useMemo } from 'react'
import { Button } from 'antd'
import { Calendar, Email } from '@prisma/client'
import { useSearchParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { CalendarOutlined, MailOutlined } from '@ant-design/icons'

import { Switch } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import { fetchMembers } from 'pages/members/queries'

import EmailEvent from './email-event'
import CalendarEvent from './calendar-event'
import { fetchCalendarEvents, fetchEmailEvents } from '../queries'

export default function Engagement() {
  const { member } = useAuth()
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') ?? ''

  const [{ data: calendars, isLoading }, { data: emails }, { data: members }] =
    useQueries({
      queries: [
        {
          queryKey: ['calendars', candidateId],
          queryFn: () => fetchCalendarEvents(candidateId),
        },
        {
          queryKey: ['emails', candidateId],
          queryFn: () => fetchEmailEvents(candidateId),
        },
        {
          queryKey: ['members'],
          queryFn: fetchMembers,
        },
      ],
    })

  const mergeData = useMemo(() => {
    const calendarData: Array<Calendar & { type: 'calendar' }> =
      calendars?.map((calendar) => ({ ...calendar, type: 'calendar' })) ?? []

    const emailData: Array<Email & { type: 'email' }> =
      emails?.map((email) => ({ ...email, type: 'email' })) ?? []

    return [...calendarData, ...emailData].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }, [calendars, emails])

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <p className="mb-6 text-base font-semibold">Candidate Engagement</p>

      <Switch>
        <Switch.Match when={isLoading}>{/* Add loading state */}</Switch.Match>

        <Switch.Match when={mergeData.length === 0}>
          <div className="p-4 border rounded-md">
            <p className="font-medium text-gray-900">
              No engagement for this candidate
            </p>
            <p className="mb-4 text-gray-500">
              All the communication with candidate will show up here.
            </p>

            <Button
              className="mr-4"
              icon={<CalendarOutlined />}
              disabled={!member?.Integration?.gcal?.isInstalled}
            >
              Schedule an Interview
            </Button>
            <Button
              icon={<MailOutlined />}
              disabled={!member?.Integration?.gmail?.isInstalled}
            >
              Send Email
            </Button>
          </div>
        </Switch.Match>

        <Switch.Match when={mergeData}>
          {(data) => (
            <div className="space-y-6">
              {data.map(({ type, ...rest }) => (
                <Switch key={rest.id}>
                  <Switch.Match when={type === 'calendar'}>
                    <CalendarEvent {...(rest as Calendar)} members={members} />
                  </Switch.Match>

                  <Switch.Match when={type === 'email'}>
                    <EmailEvent {...(rest as Email)} members={members} />
                  </Switch.Match>
                </Switch>
              ))}
            </div>
          )}
        </Switch.Match>
      </Switch>
    </div>
  )
}
