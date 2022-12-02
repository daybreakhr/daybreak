import { Workspace } from '@prisma/client'
import client from 'utils/client'

type CreateWorkspaceDto = {
  name: string
  slug: string
  description?: string
}

export async function createWorkspace({
  createWorkspaceDto,
}: {
  createWorkspaceDto: CreateWorkspaceDto
}) {
  const { data } = await client.post<Workspace>('workspace', createWorkspaceDto)
  return data
}

export async function verifySlug({ slug }: { slug: string }) {
  const { data } = await client.post<boolean>('workspace/verify-slug', { slug })
  return data
}
