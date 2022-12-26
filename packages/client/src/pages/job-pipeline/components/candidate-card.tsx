import dayjs from 'dayjs'
import { meanBy } from 'lodash'
import { Avatar, Rate } from 'antd'
import { Feedback } from '@prisma/client'

type CandidateCardProps = {
  name: string
  createdAt: string
  feedbacks: Feedback[]
}

export default function CandidateCard({
  name,
  createdAt,
  feedbacks,
}: CandidateCardProps) {
  return (
    <div className="w-full p-4 bg-white rounded-md shadow-md hover:bg-gray-50">
      <div className="flex items-center mb-4 space-x-2">
        <Avatar>{name.charAt(0)}</Avatar>
        <p className="font-semibold">{name}</p>
      </div>

      <div className="flex items-end pt-2 border-t">
        <div>
          <p className="text-sm font-medium">Feedback Score</p>
          <Rate allowHalf disabled value={meanBy(feedbacks, (f) => f.score)} />
        </div>

        <div className="flex-1" />

        <p className="text-xs font-normal text-gray-500">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>
    </div>
  )
}
