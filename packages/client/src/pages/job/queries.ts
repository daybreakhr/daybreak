import type { Candidate } from '@prisma/client'
import { Job } from 'types/job'
import client from 'utils/client'

export async function fetchJob(jobId: string) {
  const { data } = await client.get<Job>(`jobs/${jobId}`)
  return data
}

export async function fetchCandidatesByJob(jobId: string) {
  const { data } = await client.get<Candidate[]>(`jobs/${jobId}/candidates`)
  return data
}

export async function createCandidate(body: FormData) {
  const { data } = await client.post<Candidate>('candidates', body)
  return data
}

export async function createCandidateFromResume(body: FormData) {
  const { data } = await client.post<Candidate>('candidates/process', body)
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
