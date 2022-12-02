import { snakeCase } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, message } from 'antd'
import { createWorkspace, verifySlug } from './queries'

export default function CreateWorkspace() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { mutate, isLoading } = useMutation(createWorkspace, {
    onSuccess: () => {
      navigate('/onboarding/setup')
    },
    onError: (error: any) => {
      const errMessage = error?.response?.data?.error
      if (errMessage) {
        message.error(errMessage)
      }
    },
  })

  function handleNameChange(value: string) {
    form.setFieldValue('slug', snakeCase(value))
  }

  return (
    <div className="flex justify-center w-full pt-[20vh]">
      <div className="flex flex-col items-center w-full max-w-2xl">
        <p className="mb-1 text-xl text-gray-700">Welcome to Daybreak Hire!</p>
        <p className="mb-4 text-xl text-gray-700">
          Let&apos;s start by setting up your workspace
        </p>

        <Form
          form={form}
          layout="vertical"
          className="w-full"
          onFinish={(createWorkspaceDto) => mutate({ createWorkspaceDto })}
        >
          <div className="flex items-center w-full space-x-4">
            <Form.Item
              name="name"
              label="Name"
              className="flex-1"
              rules={[
                { required: true, message: 'Enter Name of your workspace' },
              ]}
            >
              <Input
                placeholder="Enter name of your organisation..."
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="slug"
              hasFeedback
              label="Slug"
              className="w-56"
              rules={[
                {
                  required: true,
                  message: 'Enter a unique slug for workspace',
                },
                {
                  validator: async (_, value) => {
                    const slugExists = await verifySlug({ slug: value })
                    return slugExists
                      ? Promise.reject(new Error('Slug already exists!'))
                      : Promise.resolve()
                  },
                },
              ]}
            >
              <Input placeholder="Unique identifier..." />
            </Form.Item>
          </div>

          <Form.Item name="description" label="About Organisation">
            <Input.TextArea
              rows={5}
              style={{ resize: 'none' }}
              placeholder="Your organisation details will be part of every job description..."
            />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-end">
              <Button type="primary" loading={isLoading} htmlType="submit">
                Proceed
                <RightOutlined />
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
