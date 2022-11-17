import { useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { useQuery } from '@tanstack/react-query'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Avatar, Button, Empty, Rate, Spin } from 'antd'

import { Show, Switch } from 'ui-kit'
import FeedbackForm from './feedback-form'
import { fetchFeedbacks } from '../queries'

dayjs.extend(relativeTime)

export default function Feedback() {
  const { candidateId = '' } = useParams()
  const [feedbackModal, setFeedbackModal] = useState(false)

  const { data, isLoading } = useQuery(['feedbacks', candidateId], () =>
    fetchFeedbacks(candidateId),
  )

  return (
    <div className="p-4 text-gray-800 bg-white shadow-md rounded-b-md">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold">Interview Feedback</p>
        <Show when={data && data.length > 0}>
          <Button
            type="primary"
            icon={<AiOutlinePlus />}
            onClick={() => setFeedbackModal(true)}
          >
            Add Feedback
          </Button>
        </Show>
      </div>

      <Switch>
        <Switch.Match when={isLoading}>
          <div className="flex items-center justify-center h-80">
            <Spin tip="Loading..." />
          </div>
        </Switch.Match>

        <Switch.Match when={data?.length === 0}>
          <div className="flex items-center justify-center h-80">
            <Empty description="No feedback has been added yet...">
              <Button
                type="primary"
                icon={<AiOutlinePlus />}
                onClick={() => setFeedbackModal(true)}
              >
                Add Feedback
              </Button>
            </Empty>
          </div>
        </Switch.Match>

        <Switch.Match when={data}>
          {(data) => (
            <div className="space-y-6">
              {data.map(({ id, User, title, notes, score, createdAt }) => (
                <div key={id} className="flex items-start space-x-4">
                  <Avatar
                    className="flex-none"
                    size="large"
                    src={User.photoURL}
                  >
                    {User.displayName?.charAt(0)}
                  </Avatar>
                  <div className="flex-1">
                    <p className="mb-2 font-medium">{User.displayName}</p>

                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">{title}</p>

                      <p>
                        <span className="mr-2 font-medium">Score</span>
                        <Rate disabled allowHalf defaultValue={score} />
                      </p>
                    </div>

                    <p className="mb-2 whitespace-pre-line">{notes}</p>
                    <p className="text-xs text-gray-500">
                      {dayjs(createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Switch.Match>
      </Switch>

      <FeedbackForm
        visible={feedbackModal}
        onCancel={() => setFeedbackModal(false)}
      />
    </div>
  )
}
