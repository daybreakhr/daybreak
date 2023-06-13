import clsx from 'clsx'
import dayjs from 'dayjs'
import { Checkbox, Tag } from 'antd'
import { HiBriefcase } from 'react-icons/hi'
import { CandidateSource } from '@prisma/client'
import { Show } from 'ui-kit'
import { candidateSources } from '../constants/icons'

type CandidateCardProps = {
  name: string
  createdAt: Date
  isChecked: boolean
  source: CandidateSource
  currentCompany: string | null
  onCandidateSelect: () => void
  totalYearsOfExperience: number | null
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
  const { color, icon } = candidateSources(source)

  return (
    <div
      className={clsx(
        'w-full p-4 bg-white rounded-md shadow-md hover:bg-gray-50',
        { 'outline outline-primary-300': isChecked },
      )}
    >
      <div className="relative flex items-center mb-4 space-x-2">
        <Checkbox checked={isChecked} onChange={onCandidateSelect} />

        <Tag className="p-1 border-none" color={color}>
          {icon}
        </Tag>

        <p className="font-semibold">{name}</p>

        <div className="flex-1" />

        <p className="text-xs font-normal text-gray-500">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>

      <p className="mb-1 text-gray-500">{currentCompany ?? 'N/A'}</p>

      <div className="flex items-center space-x-2 text-gray-500">
        <HiBriefcase className="w-4 h-4" />
        <p>
          <Show when={totalYearsOfExperience} fallback="N/A">
            {(value) => `${value} years`}
          </Show>
        </p>
      </div>
    </div>
  )
}
