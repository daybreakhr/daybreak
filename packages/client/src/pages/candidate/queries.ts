import axios from 'axios'
import type { Resume } from '@affinda/affinda'
import client from 'utils/client'
import { Candidate } from 'types/candidate'

export async function fetchCandidate(candidateId: string) {
  const { data } = await client.get<Candidate>(`candidates/${candidateId}`)
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
    `candidates/${candidateId}`,
    body,
  )
  return data
}
