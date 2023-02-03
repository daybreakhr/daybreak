import type { Prospect as PProspect, Job } from '@prisma/client'

export type Prospect = PProspect & {
  Jobs: Job[]
}
