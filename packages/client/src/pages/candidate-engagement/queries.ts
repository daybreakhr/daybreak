import { Calendar } from '@prisma/client'
import client from 'utils/client'

export async function fetchCalendarEvents(candidateId: string) {
  const { data } = await client.get<Calendar[]>(
    `candidates/${candidateId}/calendars`,
  )
  return data
}

export async function createCalendarEvent({
  candidateId,
  body,
}: {
  candidateId: string
  body: Partial<Calendar>
}) {
  const { data } = await client.post<Calendar>(
    `candidates/${candidateId}/calendars`,
    body,
  )
  return data
}
