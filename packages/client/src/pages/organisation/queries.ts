import type { Department, Location, Workspace } from '@prisma/client'
import client from 'utils/client'

const WORKSPACE_ID = import.meta.env.VITE_WORKSPACE_ID

export async function fetchOrganisation() {
  const { data } = await client.get<Workspace>(`workspace?id=${WORKSPACE_ID}`)
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

export async function addDepartment({ name }: { name: string }) {
  const { data } = await client.post<Department>(`${WORKSPACE_ID}/department`, {
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
  const { data } = await client.patch<Department>(
    `${WORKSPACE_ID}/department/${id}`,
    { name },
  )
  return data
}

export async function deleteDepartment({ id }: { id: string }) {
  const { data } = await client.delete<Department>(
    `${WORKSPACE_ID}/department/${id}`,
  )
  return data
}

export async function addLocation({ name }: { name: string }) {
  const { data } = await client.post<Location>(`${WORKSPACE_ID}/location`, {
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
  const { data } = await client.patch<Location>(
    `${WORKSPACE_ID}/location/${id}`,
    { name },
  )
  return data
}

export async function deleteLocation({ id }: { id: string }) {
  const { data } = await client.delete<Location>(
    `${WORKSPACE_ID}/location/${id}`,
  )
  return data
}
