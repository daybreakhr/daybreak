import clsx from 'clsx'
import dayjs from 'dayjs'
import { Checkbox } from 'antd'
import { FaAward } from 'react-icons/fa'
import { HiOfficeBuilding } from 'react-icons/hi'
import { Show } from 'ui-kit'

type CandidateCardProps = {
  name: string
  createdAt: Date
  isChecked: boolean
  currentCompany: string | null
  onCandidateSelect: () => void
  totalYearsOfExperience: number | null
}

export default function CandidateCard({
  name,
  createdAt,
  isChecked,
  currentCompany,
  onCandidateSelect,
  totalYearsOfExperience,
}: CandidateCardProps) {
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
          {name}
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
