import { Button, Form, Input, message, Spin } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchOrganisation, updateOrganisation } from './queries'

export default function Organisation() {
  const [form] = Form.useForm()

  const { isLoading } = useQuery(['organisation'], fetchOrganisation, {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 m-8 bg-white rounded-md shadow-md h-96">
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <div className="p-4 m-8 bg-white rounded-md shadow-md">
      <p className="mb-4 font-sans text-xl font-medium">Organisation Details</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={(updateWorkspaceDto) => mutate({ updateWorkspaceDto })}
      >
        <div className="flex items-start w-full">
          <div className="w-full max-w-3xl mr-12">
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
                rows={6}
                placeholder="Your organisation details will be part of every job description..."
              />
            </Form.Item>
          </div>
        </div>

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
