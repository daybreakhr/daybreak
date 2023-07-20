import type {
  Candidate as PCandidate,
  Feedback as PFeedback,
  Interview,
  Job,
} from '@prisma/client'
import { User } from 'firebase/auth'

export type Candidate = Omit<PCandidate, 'createdAt'> & {
  createdAt: string
  Job: Job & { Interview: Interview[] }
  Feedback: Feedback[]
  ReferredBy: User | null
}

export type Feedback = PFeedback & {
  Interview: Interview
  User?: User | null
}
