import type { Candidate, CandidateSource } from '@prisma/client'
import { Job } from 'types/job'
import { storage } from 'ui-kit'
import client from 'utils/client'
import { WORKSPACE_ID } from 'utils/constants'

export async function fetchJob(jobId: string) {
  const { data } = await client.get<Job>(`jobs/${jobId}`)
  return data
}

export async function fetchCandidatesByJob(jobId: string) {
  const { data } = await client.get<Candidate[]>(`jobs/${jobId}/candidates`)
  return data
}

export async function createCandidateFromResume(
  jobId: string,
  source: CandidateSource,
) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Candidate>('candidates/process', {
    workspaceId,
    jobId,
    source,
  })
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
