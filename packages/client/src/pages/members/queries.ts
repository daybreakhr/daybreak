import { storage } from 'ui-kit'
import client from 'utils/client'
import { Member } from 'types/member'
import { WORKSPACE_ID } from 'utils/constants'
import { Invitees, Role } from '@prisma/client'

export async function fetchMembers() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<{ data: Member[] }>(
    `${workspaceId}/members`,
  )
  return data
}

export async function inviteUser({
  email,
  role,
}: {
  email: string
  role: Role
}) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Invitees>(`${workspaceId}/invite/new`, {
    email,
    role,
  })
  return data
}
