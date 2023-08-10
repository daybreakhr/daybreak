import type { Department, Location, Interview } from '@prisma/client'
import { storage } from 'ui-kit'
import client from 'utils/client'
import { Job } from 'types/job'
import { WORKSPACE_ID } from 'utils/constants'

export async function fetchDepartments() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Department[]>(
    `workspaces/${workspaceId}/departments`,
  )
  return data
}

export async function fetchLocations() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Location[]>(
    `workspaces/${workspaceId}/locations`,
  )
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

export async function createJob() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Job>('jobs', { workspaceId })
  return data
}

// job pipeline queries

export type CreateInterviewDto = {
  title: string
  order: number
  jobId: string
}

export async function fetchInterviews(jobId: string) {
  const { data } = await client.get<Interview[]>(`jobs/${jobId}/interviews`)
  return data
}

export async function createPipelineStep(payload: CreateInterviewDto) {
  const { data } = await client.post<Interview>('interviews', payload)
  return data
}

export async function updatePipelineStep({
  id,
  payload,
}: {
  id: string
  payload: Partial<Interview>
}) {
  const { data } = await client.patch<Interview>(`interviews/${id}`, payload)
  return data
}

export async function deletePipelineStep({ id }: { id: string }) {
  const { data } = await client.delete<Interview>(`interviews/${id}`)
  return data
}
