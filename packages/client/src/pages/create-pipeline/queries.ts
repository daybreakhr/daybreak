import { Interview } from '@prisma/client'
import client from 'utils/client'

export async function fetchInterviews(jobId: string) {
  const { data } = await client.get<Interview[]>(`jobs/${jobId}/interviews`)
  return data
}

export async function createInterview({
  title,
  jobId,
}: {
  title: string
  jobId: string
}) {
  const { data } = await client.post<Interview>('interviews', {
    title,
    jobId,
    order: 1,
  })

  return data
}

export async function updateInterview({
  title,
  jobId,
  id,
}: {
  title: string
  jobId: string
  id: string
}) {
  const { data } = await client.patch<Interview>(`interviews/${id}`, {
    title,
    jobId,
  })

  return data
}

export async function deleteInterview(id: string) {
  const { data } = await client.delete<Interview>(`interviews/${id}`)
  return data
}
