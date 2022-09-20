import client from 'utils/client'
import type { Department, Location } from '@prisma/client'

const WORKSPACE_ID = '6317158147089f094cd4598e'

export async function fetchDepartments() {
  const { data } = await client.get<Department[]>(`${WORKSPACE_ID}/department`)
  return data
}

export async function fetchLocations() {
  const { data } = await client.get<Location[]>(`${WORKSPACE_ID}/location`)
  return data
}
