import { AiOutlineUser } from 'react-icons/ai'
import { Form, Input, message, Modal, Select } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { addMember } from '../queries'

type AddUserProps = {
  isVisible: boolean
  onClose: () => void
}

export default function AddUser({ isVisible, onClose }: AddUserProps) {
  const [form] = Form.useForm()

  const { mutateAsync, isLoading } = useMutation(addMember, {
    onSuccess: () => {
      onClose()
      message.success('The invite has been successfully sent!')
    },
  })

  function handleSubmit() {
    form.validateFields().then((values) => {
      mutateAsync(values)
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
      confirmLoading={isLoading}
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
      </Form>
    </Modal>
  )
}
