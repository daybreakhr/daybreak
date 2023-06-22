import type { Job } from '@prisma/client'
import client from 'utils/client'

export async function fetchFavoriteJobs() {
  const { data } = await client.get<Job[]>('jobs/favorites')
  return data
}
