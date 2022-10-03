import { Button, Form, Input, message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchOrganisation, updateOrganisation } from '../queries'

export default function OrgDetails() {
  const [form] = Form.useForm()

  useQuery(['organisation'], fetchOrganisation, {
    onSuccess: (data) => {
      form.setFieldsValue(data)
    },
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading: isOrganisationUpdating } = useMutation(
    updateOrganisation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['organisation'])
        message.success('Successfully updated your organisation settings')
      },
    },
  )

  return (
    <div className="p-4 m-8 bg-white rounded-md shadow-md">
      <p className="mb-4 font-sans text-xl font-medium">Organisation Details</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={(updateWorkspaceDto) => mutate({ updateWorkspaceDto })}
      >
        <div className="flex items-center w-full space-x-4">
          <Form.Item
            name="name"
            label="Name"
            className="flex-1"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter name of your organisation..." />
          </Form.Item>

          <Form.Item name="slug" label="Slug" className="w-64">
            <Input readOnly disabled />
          </Form.Item>
        </div>

        <Form.Item name="description" label="About Organisation">
          <Input.TextArea
            rows={4}
            placeholder="Your organisation details will be part of every job description..."
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isOrganisationUpdating}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
