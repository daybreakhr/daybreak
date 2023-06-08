import type { Candidate } from '@prisma/client'
import client from 'utils/client'
import { Job } from 'types/job'

export async function fetchJob(jobId: string) {
  const { data } = await client.get<Job>(`jobs/${jobId}`)
  return data
}

export async function fetchCandidatesByJob(jobId: string) {
  const { data } = await client.get<Candidate[]>(`jobs/${jobId}/candidates`)
  return data
}

export async function bulkUpdateCandidate(
  payload: { id: string; data: Partial<Candidate> }[],
) {
  const { data } = await client.patch<Candidate[]>(
    'candidates/bulk-actions',
    payload,
  )
  return data
}
