import { Candidate } from '@prisma/client'
import client from 'utils/client'

export type CreateCandidateBody = {
  firstName: string
  middleName?: string
  lastName: string
  phone: string
  affindaId: string
  linkedInUrl?: string
  location: string
  email: string
  jobId: string
}

export async function createCandidate({
  workspaceId,
  body,
}: {
  workspaceId: string
  body: FormData
}) {
  const { data } = await client.post<Candidate>(
    `${workspaceId}/candidates`,
    body,
  )
  return data
}
