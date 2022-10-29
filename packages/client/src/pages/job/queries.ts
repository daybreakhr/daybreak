import client from 'utils/client'
import { Job } from 'types/job'

export async function fetchJob(jobId: string) {
  const { data } = await client.get<Job>(`jobs/${jobId}`)
  return data
}
