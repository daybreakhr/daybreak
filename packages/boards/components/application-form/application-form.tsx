import { Form, Input, Button } from 'antd'
import 'antd/es/form/style/index.css'
import 'antd/es/input/style/index.css'
import clsx from 'clsx'

export default function ApplicationForm() {
  const [form] = Form.useForm()

  return (
    <>
      <div className="flex items-center mb-4">
        <Button
          className={clsx(
            'mr-2 p-2 border rounded-sm text-purple-600 border-purple-600 hover:text-white hover:bg-purple-500',
          )}
        >
          Apply with Resume
        </Button>
        <div className="inline-block align-middle">Or</div>
        <Button
          className={clsx(
            'ml-2 p-2 border rounded-sm text-sky-600 border-sky-600 hover:text-white hover:bg-sky-600',
          )}
        >
          Autofill with LinkedIn
        </Button>
      </div>
      <Form form={form}>
        <div className="leading-10 pb-10">
          <div className="flex place-content-between">
            <Form.Item name="fname" label="First Name" required>
              <Input />
            </Form.Item>
            <Form.Item name="mname" label="Midle Name">
              <Input />
            </Form.Item>
            <Form.Item name="lname" label="Last Name" required>
              <Input />
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
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item name="linkedinurl" label="Linkedin Profile URL">
            <Input />
          </Form.Item>
          <Form.Item name="githuburl" label="GitHub Profile URL">
            <Input />
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
