import { User } from 'firebase/auth'
import { Feedback } from '@prisma/client'
import client from 'utils/client'
import { Candidate } from 'types/candidate'

export async function fetchFeedbacks(candidateId: string) {
  const { data } = await client.get<Array<Feedback & { User: User }>>(
    `candidates/${candidateId}/feedbacks`,
  )
  return data
}

export async function createFeedback({
  candidateId,
  body,
}: {
  candidateId: string
  body: Partial<Candidate>
}) {
  const { data } = await client.post(
    `candidates/${candidateId}/feedbacks`,
    body,
  )
  return data
}

export async function updateFeedback({
  id,
  candidateId,
  body,
}: {
  id: string
  candidateId: string
  body: Partial<Candidate>
}) {
  const { data } = await client.patch<Feedback>(
    `candidates/${candidateId}/feedbacks/${id}`,
    body,
  )
  return data
}

export async function deleteFeedback({
  candidateId,
  id,
}: {
  candidateId: string
  id: string
}) {
  const { data } = await client.delete<Feedback>(
    `candidates/${candidateId}/feedbacks/${id}`,
  )
  return data
}
