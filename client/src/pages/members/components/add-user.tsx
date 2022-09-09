import { AiOutlineUser } from 'react-icons/ai'
import { Form, Input, message, Modal, Select } from 'antd'

type AddUserProps = {
  isVisible: boolean
  onClose: () => void
}

export default function AddUser({ isVisible, onClose }: AddUserProps) {
  const [form] = Form.useForm()

  function handleSubmit() {
    form.validateFields().then((values) => {
      setTimeout(() => {
        onClose()
        form.resetFields()
        message.success(`Sent email invite to ${values.email}`)
      }, 1000)
    })
  }

  function handleCancel() {
    onClose()
    form.resetFields()
  }

  return (
    <Modal
      width={560}
      closable={false}
      visible={isVisible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      title="Invite new user"
    >
      <Form form={form} layout="inline">
        <div className="flex-1">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email address!!',
              },
            ]}
          >
            <Input prefix={<AiOutlineUser />} placeholder="Email Address..." />
          </Form.Item>
        </div>

        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Please select role!!' }]}
        >
          <Select placeholder="Select Role" allowClear>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="member">Member</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
