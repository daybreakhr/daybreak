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
      width={640}
      visible={isVisible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      title="Invite new user"
    >
      <Form form={form} layout="vertical">
        <div className="flex items-center space-x-4">
          <Form.Item
            name="email"
            label="Email"
            className="flex-1"
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

          <Form.Item
            name="role"
            label="Role"
            className="w-40"
            rules={[{ required: true, message: 'Please select role!!' }]}
          >
            <Select placeholder="Select Role" allowClear>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="member">Member</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item name="linkedIn" label="LinkedIn URL">
          <Input placeholder="Enter LinkedIn URL of the user..." />
        </Form.Item>

        <Form.Item name="bio" label="Bio">
          <Input.TextArea
            rows={4}
            maxLength={6}
            placeholder="User's bio will be used when setting interviews with candidates..."
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
