import { useState } from 'react'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Avatar, Button, Popconfirm, Rate } from 'antd'
import { Show } from 'ui-kit'
import FeedbackForm from './feedback-form'
import { deleteFeedback, updateFeedback } from '../queries'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useAuth from 'hooks/use-auth'
import { Feedback } from 'types/candidate'

dayjs.extend(relativeTime)

type FeedbackProps = {
  feedback: Feedback
  candidateId: string
}

export default function FeedbackFragment({
  feedback,
  candidateId,
}: FeedbackProps) {
  const [feedbackModal, setFeedbackModal] = useState(false)
  const { id, User, title, notes, score, createdAt, createdBy } = feedback

  const queryClient = useQueryClient()

  const { user } = useAuth()

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
    <div className="flex items-start space-x-4">
      <Avatar className="flex-none" size="large" src={User?.photoURL}>
        {User?.displayName?.charAt(0)}
      </Avatar>
      <div className="flex-1">
        <div className="flex">
          <p className="flex-1 mb-2 font-medium">{User?.displayName}</p>
          <Show when={canDelete(createdBy)}>
            <Button
              type="text"
              icon={<EditOutlined className="text-xl" />}
              onClick={() => setFeedbackModal(true)}
            />
          </Show>
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
            <Rate disabled allowHalf value={score} />
          </p>
        </div>

        <p className="mb-2 whitespace-pre-line">{notes}</p>
        <p className="text-xs text-gray-500">{dayjs(createdAt).fromNow()}</p>
      </div>
      <FeedbackForm
        visible={feedbackModal}
        onCancel={() => setFeedbackModal(false)}
        mutationFunc={updateFeedback}
        initialValues={{ id, title, notes, score }}
      />
    </div>
  )
}
