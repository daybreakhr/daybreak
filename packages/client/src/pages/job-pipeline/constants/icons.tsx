import type { ReactNode } from 'react'
import { CandidateSource } from '@prisma/client'

import { AiFillLinkedin } from 'react-icons/ai'
import { ReactComponent as BuildingColumnsIcon } from 'assets/icons/building-columns.svg'
import { ReactComponent as GlobeIcon } from 'assets/icons/globe.svg'
import { ReactComponent as ReferralIcon } from 'assets/icons/referral.svg'
import { ReactComponent as JobPortalIcon } from 'assets/icons/job-portal.svg'

export const candidateSources: Record<CandidateSource, ReactNode> = {
  [CandidateSource.jobBoard]: <JobPortalIcon />,
  [CandidateSource.referral]: <ReferralIcon />,
  [CandidateSource.linkedIn]: <AiFillLinkedin />,
  [CandidateSource.instahyre]: <GlobeIcon />,
  [CandidateSource.iimjobs]: <BuildingColumnsIcon />,
  [CandidateSource.naukri]: <GlobeIcon />,
  [CandidateSource.other]: <GlobeIcon />,
}

export const getSourceTagColor = (source: CandidateSource): string => {
  switch (source) {
    case CandidateSource.jobBoard:
      return 'purple'
    case CandidateSource.referral:
      return 'gold'
    case CandidateSource.linkedIn:
      return 'blue'
    case CandidateSource.instahyre:
      return 'purple'
    case CandidateSource.iimjobs:
      return 'purple'
    case CandidateSource.naukri:
      return 'purple'
    case CandidateSource.other:
      return 'purple'
    default:
      return 'default'
  }
}
