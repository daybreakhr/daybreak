import { useState } from 'react'
import { Button, Skeleton } from 'antd'
import { CandidateStatus } from '@prisma/client'
import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { Switch } from 'ui-kit'

import Feedback from './feedback'
import FeedbackModal from './feedback-modal'
import { createFeedback, fetchFeedbacks } from '../queries'

type FeedbackProps = {
  status: CandidateStatus | undefined
}

export default function FeedbackTab({ status }: FeedbackProps) {
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') || ''
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false)

  const { data, isLoading } = useQuery(
    ['feedbacks', candidateId],
    () => fetchFeedbacks(candidateId),
    { enabled: !!candidateId },
  )

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-semibold">Feedback</p>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsFeedbackFormVisible(true)}
            disabled={status === CandidateStatus.rejected}
          >
            Add Feedback
          </Button>
        </div>

        <div className="space-y-4">
          <Switch>
            <Switch.Match when={isLoading}>
              {<Skeleton avatar active />}
            </Switch.Match>

            <Switch.Match when={data}>
              {(data) =>
                data.map((feedback) => (
                  <Feedback key={feedback.id} feedback={feedback} />
                ))
              }
            </Switch.Match>
          </Switch>
        </div>
      </div>

      <FeedbackModal
        mutationFunc={createFeedback}
        isOpen={isFeedbackFormVisible}
        onClose={() => setIsFeedbackFormVisible(false)}
      />
    </>
  )
}
