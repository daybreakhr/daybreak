import { Form, Modal, message, Select } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateMember } from '../queries'

type ChangeRoleFormProps = {
  memberId: string
  visible: boolean
  onCancel: () => void
}

export default function ChangeRoleForm({
  memberId,
  visible,
  onCancel,
}: ChangeRoleFormProps) {
  const [form] = Form.useForm()

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(updateMember, {
    onSuccess: () => {
      message.info('Role has been successfully updated')
      queryClient.invalidateQueries(['members'])
      onCancel()
    },
  })

  function handleOk() {
    form.validateFields().then(({ role }) =>
      mutateAsync({
        memberId,
        body: {
          role,
        },
      }),
    )
  }

  function handleCancel() {
    onCancel()
    form.resetFields()
  }

  return (
    <Modal
      title="Change Member's Role"
      destroyOnClose
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      okButtonProps={{ loading: isLoading }}
    >
      <Form form={form} className="pt-4">
        <Form.Item
          required
          name="role"
          rules={[
            {
              required: true,
              message: 'Please select a role!',
            },
          ]}
          label="Select Role:"
        >
          <Select placeholder="Select Role" style={{ width: 120 }}>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="member">Member</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
