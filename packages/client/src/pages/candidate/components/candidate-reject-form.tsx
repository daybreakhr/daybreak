import { useEffect } from 'react'
import { Form, Modal, Input } from 'antd'

type CandidateRejectFormProps = {
  title: string
  visible: boolean
  onCancel: () => void
  initialValues?: { name: string; id: string }
}

const { TextArea } = Input

export default function CandidateRejectForm({
  title,
  visible,
  onCancel,
  initialValues,
}: CandidateRejectFormProps) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  function handleOk() {
    form.submit()
  }

  function handleCancel() {
    onCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={
        <span
          style={{
            fontSize: '24px',
            display: 'flex',
            justifyContent: 'center',
            color: 'red',
            fontWeight: 'lighter',
          }}
        >
          {title}
        </span>
      }
      destroyOnClose
      onOk={handleOk}
      visible={visible}
      onCancel={handleCancel}
      okText="Reject"
      okButtonProps={{
        style: { backgroundColor: 'red', color: 'white' },
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="id" noStyle />
        <Form.Item required name="reason" label="Reason for rejection:">
          <TextArea
            rows={4}
            placeholder="Please specify the reason that lead to rejection..."
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
