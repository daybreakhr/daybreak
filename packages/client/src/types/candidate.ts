import type { Candidate as PCandidate, Job } from '@prisma/client'

export type Candidate = PCandidate & {
  Job: Job
}
