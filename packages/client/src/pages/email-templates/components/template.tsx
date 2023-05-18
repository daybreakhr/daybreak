import { useState } from 'react'
import { Button, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import MailModal from './mail-modal'
import { deleteEmailTemplate, updateEmailTemplate } from '../queries'

type TemplateProps = {
  id: string
  body: string
  name: string
  subject: string
}

export default function Template({ id, name, body, subject }: TemplateProps) {
  const [isMailModalOpen, setIsMailModalOpen] = useState(false)

  const queryClient = useQueryClient()
  const { mutate: updateTemplate, isLoading } = useMutation(
    updateEmailTemplate,
    {
      onSuccess: () => {
        setIsMailModalOpen(false)
        queryClient.invalidateQueries(['email-templates'])
      },
    },
  )

  const { mutate: deleteTemplate } = useMutation(deleteEmailTemplate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['email-templates'])
    },
  })

  function handleDelete() {
    Modal.confirm({
      title: 'Are you sure you delete this email template?',
      content: "You won't be able to re-use this template.",
      okType: 'danger',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => deleteTemplate(id),
    })
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 space-x-3 border rounded-md">
        <p>{name}</p>

        <div className="flex-1" />

        <Button
          icon={<EditOutlined />}
          onClick={() => setIsMailModalOpen(true)}
        >
          Edit
        </Button>
        <Button danger icon={<DeleteOutlined />} onClick={handleDelete}>
          Delete
        </Button>
      </div>

      <MailModal
        body={body}
        name={name}
        subject={subject}
        isLoading={isLoading}
        isOpen={isMailModalOpen}
        onClose={() => setIsMailModalOpen(false)}
        onSave={(values) => updateTemplate({ id, ...values })}
      />
    </>
  )
}
