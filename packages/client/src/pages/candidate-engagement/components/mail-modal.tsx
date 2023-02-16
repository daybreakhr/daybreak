import { Form, Input, Modal } from 'antd'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEmailEvent } from '../queries'

type MailModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MailModal({ isOpen, onClose }: MailModalProps) {
  const [form] = Form.useForm()
  const { candidateId = '' } = useParams()

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(createEmailEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['emails', candidateId])
      onClose()
    },
  })

  function handleOk() {
    form.validateFields().then((values: any) => {
      mutate({ candidateId, body: values })
    })
  }

  return (
    <Modal
      width={640}
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      title="Send Mail to Candidate"
      okButtonProps={{ loading: isLoading }}
    >
      <Form layout="vertical" className="py-2" form={form}>
        <Form.Item label="Subject" name="subject">
          <Input placeholder="Write a subject for this email..." />
        </Form.Item>
        <Form.Item label="Body" name="body">
          <Input.TextArea className="resize-none" rows={8} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
