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

export async function fetchInvitedMembers() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<{ data: Member[] }>(`${workspaceId}/invite`)
  return data
}
