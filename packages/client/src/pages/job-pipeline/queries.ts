import type { Candidate } from '@prisma/client'
import client from 'utils/client'

export async function fetchCandidatesByJob(jobId: string) {
  const { data } = await client.get<Candidate[]>(`jobs/${jobId}/candidates`)
  return data
}
