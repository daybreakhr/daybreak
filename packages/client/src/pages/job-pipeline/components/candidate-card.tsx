import dayjs from 'dayjs'
import { meanBy } from 'lodash'
import { Avatar, Rate } from 'antd'
import { Feedback } from '@prisma/client'
import { Show } from 'ui-kit'

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
    <div className="w-full p-4 bg-white rounded shadow-md">
      <div className="flex items-center space-x-2">
        <Avatar>{name.charAt(0)}</Avatar>
        <p className="font-semibold">{name}</p>
      </div>

      <div className="flex items-center">
        <Show when={feedbacks.length > 0}>
          <Rate allowHalf value={meanBy(feedbacks, (f) => f.score)} disabled />
        </Show>

        <div className="flex-1" />

        <p className="text-xs font-normal text-gray-500">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>
    </div>
  )
}
