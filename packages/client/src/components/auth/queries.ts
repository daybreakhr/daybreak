import { Member } from '@prisma/client'
import client from 'utils/client'

export async function fetchMe() {
  const { data } = await client.get<Member | null>('auth/me')
  return data
}
