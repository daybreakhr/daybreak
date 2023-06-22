import type { ReactNode } from 'react'
import { CandidateSource } from '@prisma/client'

import { AiFillLinkedin } from 'react-icons/ai'
import { ReactComponent as BuildingColumnsIcon } from 'assets/icons/building-columns.svg'
import { ReactComponent as GlobeIcon } from 'assets/icons/globe.svg'
import { ReactComponent as ReferralIcon } from 'assets/icons/referral.svg'
import { ReactComponent as JobPortalIcon } from 'assets/icons/job-portal.svg'
import { ReactComponent as LowPriorityIcon } from 'assets/icons/low_priority.svg'
import { ReactComponent as MediumPriorityIcon } from 'assets/icons/medium_priority.svg'
import { ReactComponent as HighPriorityIcon } from 'assets/icons/high_priority.svg'

export const candidateSources = (
  source: CandidateSource,
): { color: string; icon: ReactNode } => {
  switch (source) {
    case CandidateSource.jobBoard:
      return { color: 'purple', icon: <JobPortalIcon /> }
    case CandidateSource.referral:
      return { color: 'gold', icon: <ReferralIcon /> }
    case CandidateSource.linkedIn:
      return { color: 'blue', icon: <AiFillLinkedin /> }
    case CandidateSource.instahyre:
      return { color: 'purple', icon: <GlobeIcon /> }
    case CandidateSource.iimjobs:
      return {
        color: 'purple',
        icon: <BuildingColumnsIcon />,
      }
    case CandidateSource.naukri:
      return { color: 'purple', icon: <GlobeIcon /> }
    case CandidateSource.other:
      return { color: 'purple', icon: <GlobeIcon /> }
    default:
      return { color: 'default', icon: null }
  }
}

export const jobPriorityInfo = (
  priority: string,
): {
  icon: ReactNode
  labelColor: string
} => {
  switch (priority) {
    case 'low':
      return {
        icon: <LowPriorityIcon />,
        labelColor: 'text-green-600',
      }
    case 'medium':
      return {
        icon: <MediumPriorityIcon />,
        labelColor: 'text-orange-600',
      }
    case 'high':
      return {
        icon: <HighPriorityIcon />,
        labelColor: 'text-red-600',
      }
    default:
      return {
        icon: null,
        labelColor: '',
      }
  }
}
