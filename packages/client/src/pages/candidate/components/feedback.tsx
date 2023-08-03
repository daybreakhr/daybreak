import { useState } from 'react'
import dayjs from 'dayjs'
import { Avatar, Button, Modal, Rate } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

import { Show } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import getEvaluation from 'utils/evaluation'
import { Feedback as TFeedback } from 'types/candidate'

import { deleteFeedback, updateFeedback } from '../queries'
import FeedbackModal from './feedback-modal'

type FeedbackProps = {
  feedback: TFeedback
}

export default function Feedback({ feedback }: FeedbackProps) {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') || ''
  const [isFeedbackEditable, setIsFeedbackEditable] = useState(false)
  const { id, attributes, createdAt, evaluation, notes, Interview, User } =
    feedback

  const queryClient = useQueryClient()

  const { mutate, isLoading: isDeletingFeedback } = useMutation(
    deleteFeedback,
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['feedbacks', candidateId]),
    },
  )

  function handleDelete({ id }: { id: string }) {
    Modal.confirm({
      title: 'Are you sure to delete this feedback?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      okButtonProps: { loading: isDeletingFeedback },
      onOk() {
        mutate({ id })
      },
    })
  }

  return (
    <>
      <div className="flex items-center mb-4 space-x-2">
        <Avatar src={User?.photoURL}>{User?.displayName?.charAt(0)}</Avatar>
        <p className="font-medium">
          {User?.displayName} {user?.uid === User?.uid ? '(you)' : ''}
        </p>
        <p className="text-gray-500">{dayjs(createdAt).fromNow()}</p>
        <div className="flex-1" />
        <Button
          size="small"
          type="text"
          onClick={() => setIsFeedbackEditable(true)}
          icon={<EditOutlined className="text-xs" />}
        />
        <Button
          danger
          size="small"
          type="text"
          icon={<DeleteOutlined className="text-xs" />}
          onClick={() => handleDelete({ id })}
        />
      </div>

      <div className="p-4 rounded-md bg-gray-50">
        <p className="mb-4">
          <span>Round:</span>{' '}
          <span className="font-medium">{Interview.title}</span>
        </p>

        <span className="px-3 py-1.5 border rounded-full bg-white font-medium">
          {getEvaluation(evaluation)}
        </span>

        <hr className="my-4" />

        {attributes?.map(({ name, score }, index) => (
          <div key={index} className="flex items-center mt-2">
            <p className="flex-1 text-base font-medium">{name}</p>
            <Rate value={score} disabled />
          </div>
        ))}

        <Show when={notes}>
          <hr className="my-4" />
          <p className="text-base text-gray-700">{notes}</p>
        </Show>
      </div>

      <FeedbackModal
        initialValues={feedback}
        isOpen={isFeedbackEditable}
        mutationFunc={updateFeedback}
        onClose={() => setIsFeedbackEditable(false)}
      />
    </>
  )
}
