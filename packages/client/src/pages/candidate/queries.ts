import axios from 'axios'
import { User } from 'firebase/auth'
import type { Feedback } from '@prisma/client'
import type { Resume } from '@affinda/affinda'
import { storage } from 'ui-kit'

import client from 'utils/client'
import { Candidate } from 'types/candidate'
import { WORKSPACE_ID } from 'utils/constants'

export async function fetchCandidate(candidateId: string) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Candidate>(
    `${workspaceId}/candidates/${candidateId}`,
  )
  return data
}

export async function fetchParseResume(affindaId?: string) {
  const { data } = await axios.get<Resume>(
    `${import.meta.env.VITE_AFFINDA_API_BASE_URL}resumes/${affindaId}`,
    {
      headers: {
        authorization: `Bearer ${import.meta.env.VITE_AFFINDA_TOKEN}`,
      },
    },
  )
  return data
}

export async function updateCandidate({
  candidateId,
  body,
}: {
  candidateId: string
  body: Partial<Candidate>
}) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.patch<Candidate>(
    `${workspaceId}/candidates/${candidateId}`,
    body,
  )
  return data
}

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
