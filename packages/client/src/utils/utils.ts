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

export function getCandidateSourceTitle(
  source: CandidateSource,
  referredBy?: string | null,
): React.ReactNode {
  switch (source) {
    case CandidateSource.jobBoard:
      return React.createElement(
        'div',
        null,
        React.createElement('p', { className: 'text-purple-400' }, 'Portal'),
        React.createElement('p', null, 'Daybreak'),
      )

    case CandidateSource.referral:
      return React.createElement(
        'div',
        null,
        React.createElement('p', { className: 'text-yellow-400' }, 'Referral'),
        React.createElement('p', null, 'by '),
        React.createElement('p', null, referredBy),
      )

    case CandidateSource.linkedIn:
      return React.createElement(
        'div',
        null,
        React.createElement('p', { className: 'text-blue-400' }, 'Linkedin'),
      )

    case CandidateSource.instahyre:
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          { className: 'text-purple-400' },
          'Job Websites',
        ),
        React.createElement('p', null, 'Instahyre'),
      )

    case CandidateSource.iimjobs:
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          { className: 'text-purple-400' },
          'College Portal',
        ),
        React.createElement('p', null, 'IIM Jobs'),
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
      return React.createElement(
        'div',
        null,
        React.createElement('p', { className: 'text-purple-400' }, 'Other'),
      )

    default:
      return React.createElement(
        'div',
        null,
        React.createElement('p', { className: 'text-purple-400' }, 'Other'),
      )
  }
}

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

export function getPipelineStages(interviews: Interview[]) {
  return [
    ...candidateStatusOptions.slice(0, 2),
    ...interviews.map(({ id, title }) => {
      return { label: title, value: id }
    }),
    ...candidateStatusOptions.slice(2),
    { label: 'Rejected', value: CandidateStatus.rejected },
  ]
}
