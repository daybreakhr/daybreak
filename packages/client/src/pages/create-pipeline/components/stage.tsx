import { useState } from 'react'
import { Button, message, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Show } from 'ui-kit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import EditableStage from './editable-stage'
import { deleteInterview } from '../queries'

type StageProps = {
  id: string
  title: string
  color?: string
  description?: string
  jobId: string
}

export default function Stage({
  id,
  title,
  description,
  color,
  jobId,
}: StageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()

  const { mutateAsync: deleteStage, isLoading: isDeleting } = useMutation(
    deleteInterview,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['interviews'])
      },
      onError: (error: any) => {
        const errMsg = error?.response?.data?.error
        if (errMsg) {
          message.error(errMsg)
        }
      },
    },
  )

  const initialValues = { title, description, id }

  return (
    <Show
      when={!isEditing}
      fallback={
        <EditableStage
          jobId={jobId}
          initialValues={initialValues}
          onClose={() => setIsEditing(false)}
        />
      }
    >
      <div className="flex items-center px-4 py-3 border rounded-md">
        <Show when={color}>
          <div className="w-4 h-4 mr-4" style={{ backgroundColor: color }} />
        </Show>
        <p className="mr-4 font-medium text-gray-700">{title}</p>
        <p className="mr-4 text-gray-500 truncate">{description}</p>

        <div className="flex-1" />

        <div className="space-x-2 text-gray-500">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
          />
          <Popconfirm
            title="Are you sure to delete this stage?"
            onConfirm={() => deleteStage(id)}
            okText="Delete"
            cancelText="Cancel"
            disabled={isDeleting}
          >
            <Button danger type="text" icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      </div>
    </Show>
  )
}
