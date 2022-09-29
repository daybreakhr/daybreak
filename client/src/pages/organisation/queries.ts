import { Workspace } from '@prisma/client'
import client from 'utils/client'

const WORKSPACE_ID = '6317158147089f094cd4598e'

export async function fetchOrganisation() {
  const { data } = await client.get<Workspace>(`workspace/${WORKSPACE_ID}`)
  return data
}

export async function updateOrganisation({
  updateWorkspaceDto,
}: {
  updateWorkspaceDto: Partial<Workspace>
}) {
  const { data } = await client.patch<Workspace>(
    `workspace/${WORKSPACE_ID}`,
    updateWorkspaceDto,
  )
  return data
}
