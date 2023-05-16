import { CandidateSource } from '@prisma/client'

export const candidateSources = [
  { label: 'LinkedIn', value: CandidateSource.linkedIn },
  { label: 'Instahyre', value: CandidateSource.instahyre },
  { label: 'IIM Jobs', value: CandidateSource.iimjobs },
  { label: 'Naukri', value: CandidateSource.naukri },
  { label: 'Other', value: CandidateSource.other },
]
