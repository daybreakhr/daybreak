import { Candidate } from '@prisma/client'
import client from 'utils/client'

export async function createCandidate(body: FormData) {
  const { data } = await client.post<Candidate>('candidates', body)
  return data
}
