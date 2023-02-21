import { Prospect } from '@prisma/client'
import { storage } from 'ui-kit'
import client from 'utils/client'
import { WORKSPACE_ID } from 'utils/constants'

export async function createProspect(body: FormData) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Prospect>(`${workspaceId}/prospects`, body)
  return data
}
