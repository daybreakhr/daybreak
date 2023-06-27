import {
  JobType,
  CandidateStatus,
  Interview,
  CandidateSource,
} from '@prisma/client'
import React from 'react'

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

export function getCandidateSourceTitle(
  source: CandidateSource,
): React.ReactNode {
  switch (source) {
    case CandidateSource.jobBoard:
      return (
        <div>
          <p className="text-purple-400">Career Portal</p>
        </div>
      )

    case CandidateSource.referral:
      return (
        <div>
          <p className="text-yellow-400">Referral</p>
        </div>
      )

    case CandidateSource.linkedIn:
      return (
        <div>
          <p className="text-blue-400">Linkedin</p>
        </div>
      )

    case CandidateSource.instahyre:
      return (
        <div>
          <p className="text-purple-400">Instahyre</p>
        </div>
      )

    case CandidateSource.iimjobs:
      return (
        <div>
          <p className="text-purple-400">IIM Jobs</p>
        </div>
      )

    case CandidateSource.naukri:
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          { className: 'text-purple-400' },
          'Job Websites',
        ),
        React.createElement('p', null, 'Naukri'),
      )

    case CandidateSource.other:
      return (
        <div>
          <p className="text-purple-400">Naukri</p>
        </div>
      )
    default:
      return (
        <div>
          <p className="text-purple-400">Other</p>
        </div>
      )
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
