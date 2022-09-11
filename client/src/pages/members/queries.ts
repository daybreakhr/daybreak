import client from 'utils/client'
import { Member } from 'types/member'

const WORKSPACE_ID = '6317158147089f094cd4598e'

export async function fetchMembers() {
  const { data } = await client.get<{ data: Member[] }>(
    `${WORKSPACE_ID}/members`,
  )
  return data
}
