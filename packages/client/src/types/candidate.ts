import type {
  Candidate as PCandidate,
  Feedback as PFeedback,
  Job,
} from '@prisma/client'
import { User } from 'firebase/auth'

export type Candidate = Omit<PCandidate, 'createdAt'> & {
  createdAt: string
  Job: Job
  Feedback: Feedback[]
}

export type Feedback = PFeedback & {
  User?: User | null
}
