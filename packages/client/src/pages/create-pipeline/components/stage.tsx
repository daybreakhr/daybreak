import { useState } from 'react'
import { Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Show } from 'ui-kit'
import EditableStage from './editable-stage'

type StageProps = {
  title: string
  color: string
  description?: string
}

export default function Stage({ title, description, color }: StageProps) {
  const [isEditing, setIsEditing] = useState(false)

  function onClose() {
    setIsEditing(false)
  }

  const initialValues = { title, description }

  return (
    <Show
      when={!isEditing}
      fallback={
        <EditableStage initialValues={initialValues} onClose={onClose} />
      }
    >
      <div className="flex items-center px-4 py-3 border rounded-md">
        <div className="w-4 h-4 mr-4" style={{ backgroundColor: color }} />
        <p className="mr-4 font-medium text-gray-700">{title}</p>
        <p className="mr-4 text-gray-500 truncate">{description}</p>

        <div className="flex-1" />

        <div className="space-x-2 text-gray-500">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
          />

          <Button danger type="text" icon={<DeleteOutlined />} />
        </div>
      </div>
    </Show>
  )
}
