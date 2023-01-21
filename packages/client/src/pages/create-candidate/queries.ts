import { Candidate } from '@prisma/client'
import { storage } from 'ui-kit'
import client from 'utils/client'
import { WORKSPACE_ID } from 'utils/constants'

export async function createCandidate(body: FormData) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Candidate>(
    `${workspaceId}/candidates`,
    body,
  )
  return data
}
