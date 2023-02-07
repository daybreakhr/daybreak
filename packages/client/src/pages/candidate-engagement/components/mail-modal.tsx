import { Form, Input, Modal } from 'antd'

type MailModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MailModal({ isOpen, onClose }: MailModalProps) {
  return (
    <Modal
      width={640}
      open={isOpen}
      onCancel={onClose}
      title="Send Mail to Candidate"
    >
      <Form layout="vertical" className="py-2">
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
