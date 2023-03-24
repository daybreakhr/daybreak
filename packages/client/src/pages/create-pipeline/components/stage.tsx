import { useState } from 'react'
import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Show } from 'ui-kit'
import EditableStage from './editable-stage'
import { deletePipelineStep, updatePipelineStep } from '../queries'

type StageProps = {
  id: string
  title: string
  identifier: string
}

export default function Stage({ id, title, identifier }: StageProps) {
  const { jobId = '' } = useParams()
  const [isEditing, setIsEditing] = useState(false)

  const queryClient = useQueryClient()

  const { mutate: updateInterview, isLoading: isUpdatingInterview } =
    useMutation(updatePipelineStep, {
      onSuccess: () => {
        queryClient.invalidateQueries(['interviews', jobId])
        setIsEditing(false)
      },
    })

  const { mutate: deleteInterview, isLoading: isDeletingInterview } =
    useMutation(deletePipelineStep, {
      onSuccess: () => {
        queryClient.invalidateQueries(['interviews', jobId])
      },
    })

  function handleUpdateInterview(values: {
    title: string
    description?: string
  }) {
    updateInterview({ id, payload: { ...values } })
  }

  return (
    <Show
      when={!isEditing}
      fallback={
        <EditableStage
          initialValues={{ title, identifier }}
          onSave={handleUpdateInterview}
          isUpdating={isUpdatingInterview}
          onClose={() => setIsEditing(false)}
        />
      }
    >
      <div className="flex items-center px-4 py-3 border rounded-md">
        <div className="w-4 h-4 mr-4" style={{ backgroundColor: identifier }} />
        <p className="mr-4 font-medium text-gray-700">{title}</p>

        <div className="flex-1" />

        <div className="space-x-2 text-gray-500">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
          />

          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            loading={isDeletingInterview}
            onClick={() => deleteInterview({ id })}
          />
        </div>
      </div>
    </Show>
  )
}
