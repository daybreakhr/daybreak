import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Button, Empty, Rate, Spin } from 'antd'

import { Show, Switch } from 'ui-kit'
import FeedbackForm from './feedback-form'
import { notes } from '../constants/feedback'
import { fetchFeedbacks } from '../queries'

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
          <div className="space-y-6">
            {notes.map(
              ({ id, name, photoURL, comment, title, score, createdAt }) => (
                <div key={id} className="flex items-start space-x-4">
                  <Avatar className="flex-none" size="large" src={photoURL}>
                    {name.charAt(0)}
                  </Avatar>
                  <div className="flex-1">
                    <p className="mb-2 font-medium">{name}</p>

                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">{title}</p>

                      <p>
                        <span className="mr-2 font-medium">Score</span>
                        <Rate disabled allowHalf defaultValue={score} />
                      </p>
                    </div>

                    <p className="mb-2 whitespace-pre-line">{comment}</p>
                    <p className="text-xs text-gray-500">{createdAt}</p>
                  </div>
                </div>
              ),
            )}
          </div>
        </Switch.Match>
      </Switch>

      <FeedbackForm
        visible={feedbackModal}
        onCancel={() => setFeedbackModal(false)}
      />
    </div>
  )
}
