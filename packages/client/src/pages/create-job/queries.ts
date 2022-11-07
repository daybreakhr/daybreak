import client from 'utils/client'
import type { Department, Location } from '@prisma/client'
import { Job } from 'types/job'

const WORKSPACE_ID = import.meta.env.VITE_WORKSPACE_ID

export async function fetchDepartments() {
  const { data } = await client.get<Department[]>(`${WORKSPACE_ID}/department`)
  return data
}

export async function createDepartment({ name }: { name: string }) {
  const { data } = await client.post<Department>(`${WORKSPACE_ID}/department`, {
    name,
  })
  return data
}

export async function fetchLocations() {
  const { data } = await client.get<Location[]>(`${WORKSPACE_ID}/location`)
  return data
}

export async function updateJobById({
  jobId,
  updateJobDto,
}: {
  jobId: string
  updateJobDto: Partial<Job>
}) {
  const { data } = await client.patch<Location>(
    `${WORKSPACE_ID}/jobs/${jobId}`,
    updateJobDto,
  )
  return data
}
