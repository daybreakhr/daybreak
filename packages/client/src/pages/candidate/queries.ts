import client from 'utils/client'
import { Candidate } from 'types/candidate'

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
