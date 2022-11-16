import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Input, Modal, Rate } from 'antd'
import { useParams } from 'react-router-dom'
import { createFeedback } from '../queries'

type FeedbackFormProps = {
  visible: boolean
  onCancel: () => void
}

export default function FeedbackForm({ visible, onCancel }: FeedbackFormProps) {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const { candidateId = '' } = useParams()

  const { mutate, isLoading } = useMutation(createFeedback, {
    onSuccess: () => {
      onCancel()
      queryClient.invalidateQueries(['feedbacks', candidateId])
    },
  })

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title="Add interview feedback"
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          mutate({ candidateId, body: values })
        }}
      >
        <Form.Item name="title" label="Interview Round" required>
          <Input placeholder="Enter a name for the interview round..." />
        </Form.Item>

        <Form.Item name="notes" label="Interview Notes" required>
          <Input.TextArea
            rows={4}
            placeholder="Enter your interview feedback notes..."
          />
        </Form.Item>

        <Form.Item name="score" label="Interview Score" required>
          <Rate allowHalf />
        </Form.Item>
      </Form>
    </Modal>
  )
}
