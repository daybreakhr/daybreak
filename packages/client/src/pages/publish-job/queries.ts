import { Job } from '@prisma/client'
import client from 'utils/client'

export async function parseJob({ jobId }: { jobId: string }) {
  const { data } = await client.post<Job>(`jobs/${jobId}/parse`)
  return data
}
