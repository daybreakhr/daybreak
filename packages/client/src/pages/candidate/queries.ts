import axios from 'axios'
import { Candidate } from 'types/candidate'
import client from 'utils/client'

const WORKSPACE_ID = import.meta.env.VITE_WORKSPACE_ID

export async function fetchCandidate(candidateId: string) {
  const { data } = await client.get<Candidate>(
    `${WORKSPACE_ID}/candidates/${candidateId}`,
  )
  return data
}

export async function fetchParseResume(affindaId?: string) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_AFFINDA_API_BASE_URL}resumes/${affindaId}`,
    {
      headers: {
        authorization: `Bearer ${import.meta.env.VITE_AFFINDA_TOKEN}`,
      },
    },
  )
  return data
}
