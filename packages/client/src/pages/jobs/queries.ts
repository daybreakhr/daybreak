import { storage } from 'ui-kit'
import { Job } from 'types/job'
import client from 'utils/client'
import { WORKSPACE_ID } from 'utils/constants'

export async function fetchJobs() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Job[]>(`${workspaceId}/jobs`)
  return data
}

export async function createJob() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Job>(`${workspaceId}/jobs`)
  return data
}
