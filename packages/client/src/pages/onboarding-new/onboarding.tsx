import { LinkOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Card from './components/card'

export default function OnBoarding() {
  const [form] = Form.useForm()
  return (
    <div className="py-20 px-[467px]">
      <div className="w-[512px]">
        <div className="text-center">
          <p className="text-2xl font-semibold">Setup your workspace</p>
          <p className="text-gray-500">
            Create a workspace for your hiring team to collaborate throughout
            the hiring process
          </p>
        </div>

        <div className="py-12">
          <Card className="px-10 py-10">
            <Form name="validateOnly" layout="vertical" form={form}>
              <Form.Item
                name="workspace"
                rules={[
                  { required: true, message: 'Please select your workspace' },
                ]}
              >
                <p className="mb-1 font-semibold">Workspace Name</p>
                <Input size="large" placeholder="Name your workspace" />
              </Form.Item>
              <Form.Item>
                <p className="mb-1 font-semibold">Slug</p>
                <Input
                  prefix={'http://'}
                  size="large"
                  suffix={<LinkOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <p className="mb-1 font-semibold">About</p>
                <TextArea
                  placeholder="A short description about your company"
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div className="flex justify-center ">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="m-auto w-80"
            onClick={() => {
              form.validateFields()
            }}
          >
            Create Workspace
          </Button>
        </div>
      </div>
    </div>
  )
}
