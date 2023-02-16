import { Calendar, Email } from '@prisma/client'
import client from 'utils/client'

export async function fetchCalendarEvents(candidateId: string) {
  const { data } = await client.get<Calendar[]>(
    `candidates/${candidateId}/calendars`,
    { withCredentials: true },
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
    { withCredentials: true },
  )
  return data
}

export async function fetchEmailEvents(candidateId: string) {
  const { data } = await client.get<Email[]>(
    `candidates/${candidateId}/emails`,
    { withCredentials: true },
  )
  return data
}

export async function createEmailEvent({
  candidateId,
  body,
}: {
  candidateId: string
  body: Partial<Email>
}) {
  const { data } = await client.post<Email>(
    `candidates/${candidateId}/emails`,
    body,
    { withCredentials: true },
  )
  return data
}
