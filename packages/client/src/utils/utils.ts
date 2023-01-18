import { JobType } from '@prisma/client'

export const candidateStatusOptions = [
  { text: 'Applied', value: 'applied' },
  { text: 'interview', value: 'interview' },
  { text: 'Offered', value: 'offered' },
  { text: 'Accepted', value: 'accepted' },
  { text: 'Rejected', value: 'rejected' },
]

export function getJobType(jobType: JobType | null | undefined) {
  switch (jobType) {
    case JobType.fullTime:
      return 'Full Time'
    case JobType.contract:
      return 'Contract'
    case JobType.internship:
      return 'Internship'
    case JobType.partTime:
      return 'Part Time'
    default:
      return ''
  }
}
