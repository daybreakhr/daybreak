import { storage } from 'ui-kit'
import client from 'utils/client'
import { WORKSPACE_ID } from 'utils/constants'
import type { Department, Location, Workspace } from '@prisma/client'

export async function fetchOrganisation() {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.get<Workspace>(`workspace?id=${workspaceId}`)
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
  const { data } = await client.post<Department>(`${workspaceId}/department`, {
    name,
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
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.patch<Department>(
    `${workspaceId}/department/${id}`,
    { name },
  )
  return data
}

export async function deleteDepartment({ id }: { id: string }) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.delete<Department>(
    `${workspaceId}/department/${id}`,
  )
  return data
}

export async function addLocation({ name }: { name: string }) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.post<Location>(`${workspaceId}/location`, {
    name,
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
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.patch<Location>(
    `${workspaceId}/location/${id}`,
    { name },
  )
  return data
}

export async function deleteLocation({ id }: { id: string }) {
  const workspaceId = storage.get(WORKSPACE_ID) ?? ''
  const { data } = await client.delete<Location>(
    `${workspaceId}/location/${id}`,
  )
  return data
}
