import { Form, Modal, Input } from 'antd'

type CandidateRejectFormProps = {
  visible: boolean
  onCancel: () => void
}

const { TextArea } = Input

export default function CandidateRejectForm({
  visible,
  onCancel,
}: CandidateRejectFormProps) {
  const [form] = Form.useForm()

  function handleOk() {
    form.submit()
  }

  function handleCancel() {
    onCancel()
    form.resetFields()
  }

  return (
    <Modal
      title="Candidate Rejection"
      destroyOnClose
      onOk={handleOk}
      open={visible}
      onCancel={handleCancel}
      okText="Reject"
      okButtonProps={{ danger: true }}
    >
      <Form form={form} layout="vertical">
        <Form.Item required name="reason" label="Reason for rejection:">
          <TextArea
            rows={4}
            className="resize-none"
            placeholder="Please specify the reason that lead to rejection..."
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
