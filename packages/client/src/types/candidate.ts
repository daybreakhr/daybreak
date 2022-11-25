import type { Candidate as PCandidate, Job } from '@prisma/client'

export type Candidate = Omit<PCandidate, 'createdAt'> & {
  createdAt: string
  Job: Job
}
