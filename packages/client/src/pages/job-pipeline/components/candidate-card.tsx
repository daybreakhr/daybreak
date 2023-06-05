import React from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { Checkbox, Tag } from 'antd'
import { CandidateSource } from '@prisma/client'
import { Show } from 'ui-kit'

import { FaAward } from 'react-icons/fa'
import { AiFillLinkedin } from 'react-icons/ai'
import { HiOfficeBuilding } from 'react-icons/hi'
import { ReactComponent as BuildingColumnsIcon } from 'assets/icons/building-columns.svg'
import { ReactComponent as GlobeIcon } from 'assets/icons/globe.svg'
import { ReactComponent as ReferralIcon } from 'assets/icons/referral.svg'
import { ReactComponent as JobPortalIcon } from 'assets/icons/job-portal.svg'

type CandidateCardProps = {
  name: string
  createdAt: Date
  isChecked: boolean
  source: string
  currentCompany: string | null
  onCandidateSelect: () => void
  totalYearsOfExperience: number | null
}

const candidateSources: Record<CandidateSource, React.ReactNode> = {
  [CandidateSource.jobBoard]: <JobPortalIcon />,
  [CandidateSource.referral]: <ReferralIcon />,
  [CandidateSource.linkedIn]: <AiFillLinkedin />,
  [CandidateSource.instahyre]: <GlobeIcon />,
  [CandidateSource.iimjobs]: <BuildingColumnsIcon />,
  [CandidateSource.naukri]: <GlobeIcon />,
  [CandidateSource.other]: <GlobeIcon />,
}

const getSourceTagColor = (source: CandidateSource): string => {
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

export default function CandidateCard({
  name,
  createdAt,
  isChecked,
  source,
  currentCompany,
  onCandidateSelect,
  totalYearsOfExperience,
}: CandidateCardProps) {
  const sourceLabel = candidateSources[source as CandidateSource] || 'Unknown'
  const tagColor = getSourceTagColor(source as CandidateSource)

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md hover:bg-gray-50 group">
      <div className="relative flex items-center mb-4 space-x-2">
        <Checkbox
          checked={isChecked}
          onChange={onCandidateSelect}
          className={clsx(
            'group-hover:visible group-hover:opacity-100 opacity-0',
            isChecked ? 'visible opacity-100' : 'invisible opacity-0',
          )}
        />
        <p
          className={clsx(
            'absolute font-semibold transition-all group-hover:left-4',
            isChecked ? 'left-4' : '-left-2',
          )}
        >
          <div className="flex">
            <Tag className="p-1 border-none" color={tagColor}>
              {sourceLabel}
            </Tag>
            {name}
          </div>
        </p>
        <div className="flex-1" />
        <p className="text-xs font-normal text-gray-500">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-500">
          <HiOfficeBuilding className="w-4 h-4 " />
          <div>{currentCompany ?? 'N/A'}</div>
        </div>

        <div className="flex items-center space-x-2 text-gray-500">
          <FaAward className="w-4 h-4 " />
          <p>
            <Show when={totalYearsOfExperience} fallback="N/A">
              {(value) => `${value} years`}
            </Show>
          </p>
        </div>
      </div>
    </div>
  )
}
