import type { Department, Job as PJob, Location } from '@prisma/client'

export type Job = PJob & {
  Location: Location | null
  Department: Department | null
}
