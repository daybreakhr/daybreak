import { CandidateStatus } from '@prisma/client'

export const candidateStatusOptions = [
  { label: 'Interview', value: CandidateStatus.interview },
  { label: 'Accept', value: CandidateStatus.accepted },
  { label: 'Offer', value: CandidateStatus.offered },
  { label: 'Apply', value: CandidateStatus.applied },
]
