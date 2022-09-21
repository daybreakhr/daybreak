import client from 'utils/client'
import { Job } from 'types/job'

const WORKSPACE_ID = '6317158147089f094cd4598e'

export async function fetchJobs() {
  const { data } = await client.get<Job[]>(`${WORKSPACE_ID}/jobs`)
  return data
}

export async function createJob() {
  const { data } = await client.post<Job>(`${WORKSPACE_ID}/jobs`)
  return data
}
