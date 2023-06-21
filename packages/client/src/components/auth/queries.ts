import { Member } from 'types/member'
import client from 'utils/client'

export async function fetchMe() {
  const { data } = await client.get<Member | null>('auth/me')
  return data
}
