import { storage } from 'ui-kit'
import client from 'utils/client'
import type { Prospect } from 'types/prospect'
import { WORKSPACE_ID } from 'utils/constants'

export async function fetchProspects() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Prospect[]>(`${workspaceId}/prospects`)
  return data
}
