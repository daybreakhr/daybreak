import { storage } from 'ui-kit'
import client from 'utils/client'
import { Candidate } from 'types/candidate'
import { WORKSPACE_ID } from 'utils/constants'

export async function fetchCandidates() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Candidate[]>(
    `workspaces/${workspaceId}/candidates`,
  )
  return data
}
