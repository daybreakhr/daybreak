import { CandidateSource } from '@prisma/client'

export const candidateSources = [
  { label: 'Portal', value: CandidateSource.jobBoard },
  { label: 'Referral', value: CandidateSource.referral },
  { label: 'LinkedIn', value: CandidateSource.linkedIn },
  { label: 'Instahyre', value: CandidateSource.instahyre },
  { label: 'IIM Jobs', value: CandidateSource.iimjobs },
  { label: 'Naukri', value: CandidateSource.naukri },
  { label: 'Other', value: CandidateSource.other },
]
