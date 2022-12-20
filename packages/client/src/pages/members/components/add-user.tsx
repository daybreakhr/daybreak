import { AiOutlineUser } from 'react-icons/ai'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Input, message, Modal, Select } from 'antd'
import { inviteUser } from '../queries'

type AddUserProps = {
  isVisible: boolean
  onClose: () => void
}

export default function AddUser({ isVisible, onClose }: AddUserProps) {
  const [form] = Form.useForm()

  function handleCancel() {
    onClose()
    form.resetFields()
  }

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(inviteUser, {
    onSuccess: ({ email }) => {
      queryClient.invalidateQueries(['invite'])
      message.success(`Sent email invite to ${email}`)
      handleCancel()
    },
    onError: (error: any) => {
      const errMsg = error?.response?.data?.error
      if (errMsg) {
        message.error(errMsg)
      }
    },
  })

  return (
    <Modal
      width={640}
      open={isVisible}
      title="Invite new user"
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okButtonProps={{ loading: isLoading }}
    >
      <Form form={form} layout="vertical" onFinish={(values) => mutate(values)}>
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
