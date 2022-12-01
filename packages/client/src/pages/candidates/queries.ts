import client from 'utils/client'
import { Candidate } from 'types/candidate'

const WORKSPACE_ID = import.meta.env.VITE_WORKSPACE_ID

export async function fetchCandidates() {
  const { data } = await client.get<Candidate[]>(`${WORKSPACE_ID}/candidates`)
  return data
}
