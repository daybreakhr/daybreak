import { Form, Input, Button } from 'antd'
import 'antd/es/form/style/index.css'
import 'antd/es/input/style/index.css'
import clsx from 'clsx'

export default function ApplicationForm() {
  const [form] = Form.useForm()

  return (
    <>
      <Button
        className={clsx(
          'mb-4 p-2 border rounded-sm text-purple-600 border-purple-600 hover:text-white hover:bg-purple-500',
        )}
      >
        Apply with Resume
      </Button>
      <Form form={form}>
        <div className="leading-10 pb-10">
          <div className="flex place-content-between">
            <Form.Item name="fname" label="First Name" required>
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="mname" label="Midle Name">
              <Input placeholder="Middle Name" />
            </Form.Item>
            <Form.Item name="lname" label="Last Name" required>
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Enter Your Email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
            required
          >
            <Input placeholder="Enter Your Phone Number" />
          </Form.Item>
          <Form.Item name="linkedinurl" label="Linkedin Profile URL">
            <Input placeholder="https://linkedin.com/in/username" />
          </Form.Item>
          <Form.Item name="githuburl" label="GitHub Profile URL">
            <Input placeholder="https://github.com/username" />
          </Form.Item>
          <div className="flex justify-center">
            <Form.Item>
              <Button
                type="primary"
                className={clsx(
                  'w-40 ml-2 p-2 border rounded-sm text-white border-purple-600 bg-purple-600 hover:bg-purple-500',
                )}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  )
}
