import { Form, Input, Modal, Rate } from 'antd'

type FeedbackFormProps = {
  visible: boolean
  onCancel: () => void
}

export default function FeedbackForm({ visible, onCancel }: FeedbackFormProps) {
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title="Add interview feedback"
      onOk={() => {
        form.submit()
        onCancel()
      }}
    >
      <Form form={form} layout="vertical">
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
