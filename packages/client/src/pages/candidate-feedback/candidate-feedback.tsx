import { useState } from 'react'
import dayjs from 'dayjs'
import { range } from 'lodash'
import { useParams } from 'react-router-dom'
import { Button, Empty, Skeleton } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Show, Switch } from 'ui-kit'
import FeedbackForm from './components/feedback-form'
import { createFeedback, fetchFeedbacks } from './queries'
import FeedbackFragment from './components/feedback-fragment'

dayjs.extend(relativeTime)

export default function CandidateFeedback() {
  const { candidateId = '' } = useParams()
  const [feedbackModal, setFeedbackModal] = useState(false)

  const { data, isLoading } = useQuery(['feedbacks', candidateId], () =>
    fetchFeedbacks(candidateId),
  )

  return (
    <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md h-fit">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold">Interview Feedback</p>
        <Show when={data && data.length > 0}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setFeedbackModal(true)}
          >
            Add Feedback
          </Button>
        </Show>
      </div>

      <Switch>
        <Switch.Match when={isLoading}>
          <div className="space-y-2">
            {range(2).map((val) => (
              <Skeleton avatar paragraph={{ rows: 3 }} key={val} />
            ))}
          </div>
        </Switch.Match>

        <Switch.Match when={data?.length === 0}>
          <div className="flex items-center justify-center h-80">
            <Empty description="No feedback has been added yet...">
              <Button
                type="primary"
                icon={<PlusOutlined />}
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
              {data.map((feedback) => (
                <FeedbackFragment
                  key={feedback?.id}
                  feedback={feedback}
                  candidateId={candidateId}
                />
              ))}
            </div>
          )}
        </Switch.Match>
      </Switch>

      <FeedbackForm
        visible={feedbackModal}
        title="Add Interview Feedback"
        onCancel={() => setFeedbackModal(false)}
        mutationFunc={createFeedback}
      />
    </div>
  )
}
