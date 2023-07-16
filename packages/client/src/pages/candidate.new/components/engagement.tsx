import { useMemo } from 'react'
import { Calendar, Email } from '@prisma/client'
import { useSearchParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'

import { Switch } from 'ui-kit'
import { fetchCalendarEvents, fetchEmailEvents } from '../queries'
import CalendarEvent from './calendar-event'
// import EmailEvent from './email-event'

export default function Engagement() {
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') ?? ''

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
          {/* Add empty state */}
        </Switch.Match>

        <Switch.Match when={mergeData}>
          {(data) => (
            <div className="space-y-6">
              {data.map(({ type, ...rest }) => (
                <Switch key={rest.id}>
                  <Switch.Match when={type === 'calendar'}>
                    <CalendarEvent {...(rest as Calendar)} />
                  </Switch.Match>

                  <Switch.Match when={type === 'email'}>
                    {/* <EmailEvent {...(rest as Email)} /> */}
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
