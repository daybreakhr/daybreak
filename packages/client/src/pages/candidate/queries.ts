import axios from 'axios'
import type { Resume } from '@affinda/affinda'
import { Candidate } from 'types/candidate'
import client from 'utils/client'
import { Feedback } from '@prisma/client'

const WORKSPACE_ID = import.meta.env.VITE_WORKSPACE_ID

export async function fetchCandidate(candidateId: string) {
  const { data } = await client.get<Candidate>(
    `${WORKSPACE_ID}/candidates/${candidateId}`,
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
  const { data } = await client.patch<Candidate>(
    `${WORKSPACE_ID}/candidates/${candidateId}`,
    body,
  )
  return data
}

export async function fetchFeedbacks(candidateId: string) {
  const { data } = await client.get<Feedback[]>(
    `candidates/${candidateId}/feedbacks`,
  )
  return data
}
