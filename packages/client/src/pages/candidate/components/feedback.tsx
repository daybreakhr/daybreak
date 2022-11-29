import { useState } from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Avatar, Button, Empty, Popconfirm, Rate, Skeleton } from 'antd'

import { Show, Switch } from 'ui-kit'
import FeedbackForm from './feedback-form'
import { fetchFeedbacks, deleteFeedback } from '../queries'
import { range } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'
import useAuth from 'hooks/use-auth'

dayjs.extend(relativeTime)

export default function Feedback() {
  const { candidateId = '' } = useParams()
  const [feedbackModal, setFeedbackModal] = useState(false)

  const queryClient = useQueryClient()
  const { user } = useAuth()

  const { data, isLoading } = useQuery(['feedbacks', candidateId], () =>
    fetchFeedbacks(candidateId),
  )

  const { mutateAsync: confirmDelete, isLoading: isDeletingFeedback } =
    useMutation(deleteFeedback, {
      onSuccess: () => {
        queryClient.invalidateQueries(['feedbacks', candidateId])
      },
    })

  function canDelete(createdBy: string) {
    return user?.role === 'admin' || createdBy === user?.uid
  }

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
              {data.map(
                ({ id, User, title, notes, score, createdAt, createdBy }) => (
                  <div key={id} className="flex items-start space-x-4">
                    <Avatar
                      className="flex-none"
                      size="large"
                      src={User.photoURL}
                    >
                      {User.displayName?.charAt(0)}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex">
                        <p className="flex-1 mb-2 font-medium">
                          {User.displayName}
                        </p>
                        <Show when={canDelete(createdBy)}>
                          <Popconfirm
                            title="Are you sure to delete this feedback?"
                            onConfirm={() => confirmDelete({ candidateId, id })}
                            okText="Delete"
                            cancelText="Cancel"
                            disabled={isDeletingFeedback}
                          >
                            <Button
                              danger
                              type="text"
                              icon={<DeleteOutlined className="text-xl" />}
                            />
                          </Popconfirm>
                        </Show>
                      </div>
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
                ),
              )}
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
