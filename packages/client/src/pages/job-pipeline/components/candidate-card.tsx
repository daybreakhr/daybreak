import dayjs from 'dayjs'
import { Tag } from 'antd'
import { AiOutlineApartment } from 'react-icons/ai'
import { CandidateSource, Experience } from '@prisma/client'

type CandidateCardProps = {
  name: string
  createdAt: string
  source: string
  experience: Experience[]
}

const candidateSources: Record<CandidateSource, string> = {
  [CandidateSource.jobBoard]: 'Portal',
  [CandidateSource.referral]: 'Referral',
  [CandidateSource.linkedIn]: 'LinkedIn',
  [CandidateSource.instahyre]: 'Instahyre',
  [CandidateSource.iimjobs]: 'IIM Jobs',
  [CandidateSource.naukri]: 'Naukri',
  [CandidateSource.other]: 'Other',
}

export default function CandidateCard({
  name,
  createdAt,
  source,
  experience,
}: CandidateCardProps) {
  const sourceLabel = candidateSources[source as CandidateSource] || 'Unknown'
  const lastCompany =
    experience.length > 0 ? experience[experience.length - 1].company : 'N/A'

  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md hover:bg-gray-50">
      <div className="flex justify-between mb-4 space-x-2">
        <p className="font-semibold">{name}</p>
        <Tag color="blue">{sourceLabel}</Tag>
      </div>

      <div className="flex justify-between pt-2 border-t">
        <div className="flex items-center space-x-2 text-gray-500">
          <AiOutlineApartment className="w-4 h-4 " />
          <div>{lastCompany}</div>
        </div>
        <p className="text-xs font-normal text-gray-500">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>
    </div>
  )
}
