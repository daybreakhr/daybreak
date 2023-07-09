import clsx from 'clsx'
import dayjs from 'dayjs'
import { Checkbox, Tag, Tooltip } from 'antd'
import { HiBriefcase } from 'react-icons/hi'
import { CandidateSource } from '@prisma/client'
// import { useSearchParams } from 'react-router-dom'

import { Show } from 'ui-kit'
import { getCandidateSourceTitle } from 'utils/utils'
import { ReactComponent as OfficeBuildingsIcon } from 'assets/icons/office-buildings.svg'

import { candidateSources } from '../constants/icons'

type CandidateCardProps = {
  id: string
  name: string
  createdAt: Date
  isChecked: boolean
  source: CandidateSource
  currentCompany: string | null
  onCandidateSelect: () => void
  totalYearsOfExperience: number | null
}

export default function CandidateCard({
  // id,
  name,
  createdAt,
  isChecked,
  source,
  currentCompany,
  onCandidateSelect,
  totalYearsOfExperience,
}: CandidateCardProps) {
  // const [, setSearchParams] = useSearchParams()

  const { color, icon } = candidateSources(source)
  const sourceTitle = getCandidateSourceTitle(source)

  function handleCandidateSelect() {
    // setSearchParams({ candidateId: id })
  }

  return (
    <>
      <div
        onClick={handleCandidateSelect}
        className={clsx(
          'w-full p-4 bg-white rounded-md shadow-md hover:bg-gray-50 cursor-pointer',
          { 'outline outline-primary-300': isChecked },
        )}
      >
        <div className="relative flex items-center mb-4 space-x-2">
          <Checkbox checked={isChecked} onChange={onCandidateSelect} />

          <Tag className="p-1 border-none" color={color}>
            <Tooltip title={sourceTitle}>{icon}</Tooltip>
          </Tag>

          <p className="font-semibold truncate" title={name}>
            {name}
          </p>

          <div className="flex-1" />

          <p className="text-xs font-normal text-gray-500">
            {dayjs(createdAt).fromNow()}
          </p>
        </div>

        <div className="flex items-center mb-1 space-x-2 text-gray-500">
          <OfficeBuildingsIcon className="text-gray-400" />
          <p>{currentCompany ?? 'N/A'}</p>
        </div>

        <div className="flex items-center space-x-2 text-gray-500">
          <HiBriefcase className="text-gray-400" />
          <p>
            <Show when={totalYearsOfExperience} fallback="N/A">
              {(value) => `${value} years`}
            </Show>
          </p>
        </div>
      </div>
    </>
  )
}
