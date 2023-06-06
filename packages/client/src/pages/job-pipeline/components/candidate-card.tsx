import dayjs from 'dayjs'
import { Checkbox, Tag } from 'antd'
import { CandidateSource } from '@prisma/client'
import { Show } from 'ui-kit'
import { FaAward } from 'react-icons/fa'
import { HiOfficeBuilding } from 'react-icons/hi'
import { candidateSources, getSourceTagColor } from '../constants/icons'

type CandidateCardProps = {
  name: string
  createdAt: Date
  isChecked: boolean
  source: string
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
  const sourceLabel = candidateSources[source as CandidateSource] || 'Unknown'
  const tagColor = getSourceTagColor(source as CandidateSource)

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md hover:bg-gray-50 group">
      <div className="relative flex items-center mb-4 space-x-2">
        <Checkbox checked={isChecked} onChange={onCandidateSelect} />

        <Tag className="p-1 border-none" color={tagColor}>
          {sourceLabel}
        </Tag>

        <p className="font-semibold">{name}</p>

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
