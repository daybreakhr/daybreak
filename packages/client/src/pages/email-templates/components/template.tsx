import { useState } from 'react'
import { Button } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import MailModal from './mail-modal'

type TemplateProps = {
  body: string
  title: string
  subject: string
}

export default function Template({ title, body, subject }: TemplateProps) {
  const [isMailModalOpen, setIsMailModalOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 border rounded-md">
        <p>{title}</p>
        <Button
          icon={<FileTextOutlined />}
          onClick={() => setIsMailModalOpen(true)}
        >
          View & Edit
        </Button>
      </div>

      <MailModal
        body={body}
        title={title}
        subject={subject}
        isOpen={isMailModalOpen}
        onClose={() => setIsMailModalOpen(false)}
      />
    </>
  )
}
