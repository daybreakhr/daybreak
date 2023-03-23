import { Interview } from '@prisma/client'
import client from 'utils/client'

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
