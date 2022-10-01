import { Form, Modal, Input } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addDepartment } from '../queries'

type AddDepartmentProps = {
  visible: boolean
  onCancel: () => void
}

export default function AddDepartment({
  visible,
  onCancel,
}: AddDepartmentProps) {
  const [form] = Form.useForm()

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(addDepartment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['departments'])
      onCancel()
      form.resetFields()
    },
  })

  function handleOk() {
    form.submit()
  }

  function handleCancel() {
    onCancel()
    form.resetFields()
  }

  return (
    <Modal
      onOk={handleOk}
      visible={visible}
      onCancel={handleCancel}
      title="Add new department"
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={({ name }) => mutate({ name })}
      >
        <Form.Item required name="name" label="Department Name">
          <Input placeholder="Enter Department Name..." />
        </Form.Item>
      </Form>
    </Modal>
  )
}
