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

export async function createCandidate({ body }: { body: FormData }) {
  const { data } = await client.post<Candidate>('candidates', body)
  return data
}
