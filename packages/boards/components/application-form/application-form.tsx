import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export default function ApplicationForm() {
  const [form] = Form.useForm()

  return (
    <Form form={form} layout="vertical" className="p-4">
      <Form.Item>
        <Upload>
          <Button icon={<UploadOutlined />}>Upload Resume</Button>
        </Upload>
      </Form.Item>

      <div className="flex justify-between">
        <Form.Item name="firstName" label="First Name" required>
          <Input placeholder="First Name..." />
        </Form.Item>
        <Form.Item name="middleName" label="Midle Name">
          <Input placeholder="Middle Name..." />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" required>
          <Input placeholder="Last Name..." />
        </Form.Item>
      </div>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { type: 'email', message: 'The input is not valid E-mail!' },
          { required: true, message: 'Please input your E-mail!' },
        ]}
      >
        <Input placeholder="Enter Your Email..." />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
        required
      >
        <Input placeholder="Enter Your Phone Number..." />
      </Form.Item>

      <Form.Item name="linkedinUrl" label="Linkedin Profile URL">
        <Input placeholder="https://linkedin.com/in/username" />
      </Form.Item>

      <Form.Item name="githubUrl" label="GitHub Profile URL">
        <Input placeholder="https://github.com/username" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" className="w-40">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
