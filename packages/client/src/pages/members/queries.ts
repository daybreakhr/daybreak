import { storage } from 'ui-kit'
import client from 'utils/client'
import { Member } from 'types/member'
import { WORKSPACE_ID } from 'utils/constants'

export async function fetchMembers() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<{ data: Member[] }>(
    `${workspaceId}/members`,
  )
  return data
}

export async function addMember(body: Partial<Member>) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Member>(`${workspaceId}/invite/new`, body)
  return data
}
