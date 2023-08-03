import type { User } from 'firebase/auth'
import { Calendar, Comment, Email } from '@prisma/client'

import { storage } from 'ui-kit'
import client from 'utils/client'
import { WORKSPACE_ID } from 'utils/constants'
import { Candidate, Feedback } from 'types/candidate'

export async function fetchCandidates() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Candidate[]>(
    `workspaces/${workspaceId}/candidates`,
  )
  return data
}

export async function fetchCandidate(candidateId: string) {
  const { data } = await client.get<Candidate>(`candidates/${candidateId}`)
  return data
}

export async function updateCandidate({
  candidateId,
  body,
}: {
  candidateId: string
  body: Partial<Candidate>
}) {
  const { data } = await client.patch<Candidate>(
    `candidates/${candidateId}`,
    body,
  )
  return data
}

export async function fetchComments(candidateId: string) {
  const { data } = await client.get<(Comment & { User: User })[]>(
    `candidates/${candidateId}/comments`,
  )
  return data
}

type CreateCommentPayload = {
  content: Object
  candidateId: string
}

export async function createComment(payload: CreateCommentPayload) {
  const { data } = await client.post<Comment>('/comments', payload)
  return data
}

export async function fetchFeedbacks(candidateId: string) {
  const { data } = await client.get<Feedback[]>(
    `candidates/${candidateId}/feedbacks`,
  )
  return data
}

export async function createFeedback({ body }: { body: Partial<Feedback> }) {
  const { data } = await client.post<Feedback>('/feedbacks', body)
  return data
}

export async function updateFeedback({
  id,
  body,
}: {
  id: string
  body: Partial<Feedback>
}) {
  const { data } = await client.patch<Feedback>(`/feedbacks/${id}`, body)
  return data
}

export async function deleteFeedback({ id }: { id: string }) {
  const { data } = await client.delete(`/feedbacks/${id}`)
  return data
}

export async function fetchCalendarEvents(candidateId: string) {
  const { data } = await client.get<Calendar[]>(
    `candidates/${candidateId}/calendars`,
    { withCredentials: true },
  )
  return data
}

export async function createCalendarEvent(body: Partial<Calendar>) {
  const { data } = await client.post<Calendar>('calendars', body, {
    withCredentials: true,
  })
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
  subject,
  body,
  candidateId,
}: Partial<Email>) {
  const { data } = await client.post<Email>(
    'emails',
    { subject, body, candidateId },
    { withCredentials: true },
  )
  return data
}
