import { JobType } from '@prisma/client'

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
