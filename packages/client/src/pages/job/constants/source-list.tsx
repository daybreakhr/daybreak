import { CandidateSource } from '@prisma/client'
import { AiFillLinkedin } from 'react-icons/ai'

import { ReactComponent as GlobeIcon } from 'assets/icons/globe.svg'
import { ReactComponent as BuildingColumnsIcon } from 'assets/icons/building-columns.svg'

export const candidateSources = [
  {
    label: (
      <div className="flex items-center space-x-2">
        <AiFillLinkedin className="text-primary-500" /> <span>LinkedIn</span>
      </div>
    ),
    value: CandidateSource.linkedIn,
  },
  {
    label: (
      <div className="flex items-center space-x-2">
        <GlobeIcon className="text-primary-500" /> <span>Instahyre</span>
      </div>
    ),
    value: CandidateSource.instahyre,
  },
  {
    label: (
      <div className="flex items-center space-x-2">
        <BuildingColumnsIcon className="text-primary-500" />{' '}
        <span>IIM Jobs</span>
      </div>
    ),
    value: CandidateSource.iimjobs,
  },
  {
    label: (
      <div className="flex items-center space-x-2">
        <GlobeIcon className="text-primary-500" /> <span>Naukri</span>
      </div>
    ),
    value: CandidateSource.naukri,
  },
  {
    label: (
      <div className="flex items-center space-x-2">
        <GlobeIcon className="text-primary-500" /> <span>Other</span>
      </div>
    ),
    value: CandidateSource.other,
  },
]
