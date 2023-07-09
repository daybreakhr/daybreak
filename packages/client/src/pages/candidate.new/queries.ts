import client from 'utils/client'
import { Candidate } from 'types/candidate'

export async function fetchCandidate(candidateId: string) {
  const { data } = await client.get<Candidate>(`candidates/${candidateId}`)
  return data
}
