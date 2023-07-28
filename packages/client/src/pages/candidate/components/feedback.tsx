import { useState } from 'react'
import dayjs from 'dayjs'
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CandidateStatus } from '@prisma/client'
import { useSearchParams } from 'react-router-dom'
import { Avatar, Button, Modal, Rate, Skeleton } from 'antd'

import { Show, Switch } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import getEvaluation from 'utils/evaluation'

import AddFeedback from './add-feedback'
import { deleteFeedback, fetchFeedbacks } from '../queries'

type FeedbackProps = {
  status: CandidateStatus | undefined
}

export default function Feedback({ status }: FeedbackProps) {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') || ''
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false)

  const { data, isLoading } = useQuery(
    ['feedbacks', candidateId],
    () => fetchFeedbacks(candidateId),
    { enabled: !!candidateId },
  )

  const queryClient = useQueryClient()

  const { mutate } = useMutation(deleteFeedback, {
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks', candidateId])
    },
  })

  function handleDelete({ id }: { id: string }) {
    Modal.confirm({
      title: 'Are you sure to delete this feedback?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        mutate({ id })
      },
    })
  }

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
                data.map(
                  ({
                    id,
                    User,
                    createdAt,
                    notes,
                    attributes,
                    evaluation,
                    Interview,
                  }) => (
                    <div key={id}>
                      <div className="flex items-center mb-4 space-x-2">
                        <Avatar src={User?.photoURL} />
                        <p className="font-medium">
                          {User?.displayName}{' '}
                          {user?.uid === User?.uid ? '(you)' : ''}
                        </p>
                        <p className="text-gray-500">
                          {dayjs(createdAt).fromNow()}
                        </p>
                      </div>

                      <div className="p-4 rounded-md bg-gray-50">
                        <div className="flex justify-between">
                          <p className="mb-4">
                            <span>Round:</span>{' '}
                            <span className="font-medium">
                              {Interview.title}
                            </span>
                          </p>
                          <Button
                            danger
                            size="small"
                            type="text"
                            icon={<DeleteOutlined className="text-xs" />}
                            onClick={() => {
                              handleDelete({ id })
                            }}
                          />
                        </div>

                        <span className="px-3 py-1.5 border rounded-full bg-white font-medium">
                          {getEvaluation(evaluation)}
                        </span>

                        <hr className="my-4" />

                        {attributes?.map(({ name, score }, index) => (
                          <div key={index} className="flex items-center mt-2">
                            <p className="flex-1 text-base font-medium">
                              {name}
                            </p>
                            <Rate value={score} disabled />
                          </div>
                        ))}

                        <Show when={notes}>
                          <hr className="my-4" />
                          <p className="text-base text-gray-700">{notes}</p>
                        </Show>
                      </div>
                    </div>
                  ),
                )
              }
            </Switch.Match>
          </Switch>
        </div>
      </div>

      <AddFeedback
        isOpen={isFeedbackFormVisible}
        onClose={() => setIsFeedbackFormVisible(false)}
      />
    </>
  )
}
