import type { Department, Location } from '@prisma/client'
import { storage } from 'ui-kit'
import client from 'utils/client'
import { Job } from 'types/job'
import { WORKSPACE_ID } from 'utils/constants'

export async function fetchDepartments() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Department[]>(`${workspaceId}/department`)
  return data
}

export async function fetchLocations() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Location[]>(`${workspaceId}/location`)
  return data
}

export async function updateJobById({
  jobId,
  updateJobDto,
}: {
  jobId: string
  updateJobDto: Partial<Job>
}) {
  const { data } = await client.patch<Location>(`jobs/${jobId}`, updateJobDto)
  return data
}

export async function generateJD({
  jobId,
  jobTitle,
}: {
  jobId: string
  jobTitle: string
}) {
  const { data } = await client.post<string>(`jobs/${jobId}/generate`, {
    jobTitle,
  })
  return data
}
