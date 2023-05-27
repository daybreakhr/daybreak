import dayjs from 'dayjs'
import { AiOutlineApartment, AiOutlineHistory } from 'react-icons/ai'
import { Experience } from '@prisma/client'

type CandidateCardProps = {
  name: string
  createdAt: string
  experience: Experience[]
}

export default function CandidateCard({
  name,
  createdAt,
  experience,
}: CandidateCardProps) {
  const lastCompany =
    experience.length > 0 ? experience[experience.length - 1].company : 'N/A'

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md hover:bg-gray-50">
      <div className="flex justify-between mb-4 space-x-2">
        <p className="font-semibold">{name}</p>
        <p className="text-xs font-normal text-gray-500">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>

      <div className="flex justify-between pt-2 border-t">
        <div className="flex items-center space-x-2 text-gray-500">
          <AiOutlineApartment className="w-4 h-4 " />
          <div>{lastCompany}</div>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center space-x-2 text-gray-500">
          <AiOutlineHistory className="w-4 h-4 " />
          <div>{experience.length} years</div>
        </div>
      </div>
    </div>
  )
}
