import { storage } from 'ui-kit'
import client from 'utils/client'
import { WORKSPACE_ID } from 'utils/constants'
import type { Department, Location, Workspace } from '@prisma/client'

export async function fetchOrganisation() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Workspace>(`workspaces?id=${workspaceId}`)
  return data
}

export async function updateOrganisation({
  updateWorkspaceDto,
}: {
  updateWorkspaceDto: Partial<Workspace>
}) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.patch<Workspace>(
    `workspace/${workspaceId}`,
    updateWorkspaceDto,
  )
  return data
}

export async function addDepartment({ name }: { name: string }) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Department>('departments', {
    name,
    workspaceId,
  })
  return data
}

export async function updateDepartment({
  id,
  name,
}: {
  id: string
  name: string
}) {
  const { data } = await client.patch<Department>(`departments/${id}`, { name })
  return data
}

export async function deleteDepartment({ id }: { id: string }) {
  const { data } = await client.delete<Department>(`departments/${id}`)
  return data
}

export async function addLocation({ name }: { name: string }) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Location>('locations', {
    name,
    workspaceId,
  })
  return data
}

export async function updateLocation({
  id,
  name,
}: {
  id: string
  name: string
}) {
  const { data } = await client.patch<Location>(`locations/${id}`, { name })
  return data
}

export async function deleteLocation({ id }: { id: string }) {
  const { data } = await client.delete<Location>(`locations/${id}`)
  return data
}
