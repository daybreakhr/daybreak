import { useEffect } from 'react'
import { snakeCase } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, message } from 'antd'
import { LinkOutlined } from '@ant-design/icons'

import { Card, storage } from 'ui-kit'
import { WORKSPACE_ID } from 'utils/constants'

import { createWorkspace, verifySlug } from './queries'

const { TextArea } = Input

export default function CreateWorkspace() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const nameValue = Form.useWatch('name', form)

  useEffect(() => {
    form.setFieldValue('slug', snakeCase(nameValue))
  }, [form, nameValue])

  const { mutate, isLoading } = useMutation(createWorkspace, {
    onSuccess: (data) => {
      storage.set(WORKSPACE_ID, data.id)
      navigate('/onboarding/setup')
    },
    onError: (error: any) => {
      const errMessage = error?.response?.data?.error
      if (errMessage) {
        message.error(errMessage)
      }
    },
  })

  return (
    <div className="flex-1 py-20">
      <div className="w-[512px] mx-auto">
        <div className="text-center">
          <p className="text-2xl font-semibold">Setup your workspace</p>
          <p className="text-gray-500">
            Create a workspace for your hiring team to collaborate throughout
            the hiring process
          </p>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={(createWorkspaceDto) => mutate({ createWorkspaceDto })}
        >
          <div className="py-12">
            <Card className="px-10 py-10">
              <p className="mb-1 font-semibold">Workspace Name</p>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: 'Enter your workspace name' },
                ]}
              >
                <Input size="large" placeholder="Name your workspace" />
              </Form.Item>

              <p className="mb-1 font-semibold">Slug</p>
              <Form.Item
                name="slug"
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
                <Input
                  prefix={'https://'}
                  size="large"
                  suffix={<LinkOutlined />}
                />
              </Form.Item>

              <p className="mb-1 font-semibold">About</p>
              <Form.Item name="description">
                <TextArea
                  placeholder="A short description about your company"
                  style={{ resize: 'none' }}
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              </Form.Item>
            </Card>
          </div>

          <div className="flex justify-center ">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="m-auto w-80"
              loading={isLoading}
            >
              Create Workspace
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
