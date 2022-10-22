import client from 'utils/client'
import { Job } from 'types/job'

const WORKSPACE_ID = '6317158147089f094cd4598e'

export async function fetchJob(jobId: string) {
  const { data } = await client.get<Job>(`${WORKSPACE_ID}/jobs/${jobId}`)
  return data
}
