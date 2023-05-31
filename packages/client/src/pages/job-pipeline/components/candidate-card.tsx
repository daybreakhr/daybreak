import dayjs from 'dayjs'
import { FaAward } from 'react-icons/fa'
import { HiOfficeBuilding } from 'react-icons/hi'
import { Show } from 'ui-kit'

type CandidateCardProps = {
  name: string
  createdAt: Date
  currentCompany: string | null
  totalYearsOfExperience: number | null
}

export default function CandidateCard({
  name,
  createdAt,
  currentCompany,
  totalYearsOfExperience,
}: CandidateCardProps) {
  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md hover:bg-gray-50">
      <div className="flex justify-between mb-4 space-x-2">
        <p className="font-semibold">{name}</p>
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
