import { JobType, CandidateStatus, Interview } from '@prisma/client'

export const candidateStatusOptions = [
  { label: 'Sourced', value: CandidateStatus.sourced },
  { label: 'Applied', value: CandidateStatus.applied },
  { label: 'Interview', value: CandidateStatus.interview },
  { label: 'Offered', value: CandidateStatus.offered },
  { label: 'Accepted', value: CandidateStatus.accepted },
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

export function getLastDate(timeRange: string): Date {
  const currentDate = new Date()

  switch (timeRange) {
    case 'last-week': {
      const lastWeekDate = new Date()
      lastWeekDate.setDate(currentDate.getDate() - 7)
      return lastWeekDate
    }
    case 'last-month': {
      const lastMonthDate = new Date()
      lastMonthDate.setMonth(currentDate.getMonth() - 1)
      return lastMonthDate
    }
    case 'last-quarter': {
      const lastQuarterDate = new Date()
      lastQuarterDate.setMonth(currentDate.getMonth() - 3)
      return lastQuarterDate
    }
    default:
      return currentDate
  }
}

export function getPipelineStages(interviews: Interview[]) {
  return [
    ...candidateStatusOptions.slice(0, 2),
    ...interviews.map(({ id, title }) => {
      return { label: title, value: id }
    }),
    ...candidateStatusOptions.slice(3),
    { label: 'Rejected', value: CandidateStatus.rejected },
  ]
}
