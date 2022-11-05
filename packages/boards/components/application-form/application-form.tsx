import { useState } from 'react'
import type { UploadProps } from 'antd'
import { Form, Input, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export default function ApplicationForm() {
  const [form] = Form.useForm()
  const [disableUpload, setDisableUpload] = useState(false)

  const uploadProps: UploadProps = {
    action: `${process.env.NEXT_PUBLIC_AFFINDA_BASE_URL}resumes/`,
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_AFFINDA_TOKEN}`,
    },
    // Use data parsed from Affinda API to auto-fill form
    onChange: ({ file }) => {
      if (file.status !== 'removed') {
        setDisableUpload(true)
      } else {
        setDisableUpload(false)
      }

      if (file.status === 'done') {
        const { data } = file.response
        if (data) {
          form.setFieldValue('firstName', data.name.first)
          form.setFieldValue('middleName', data.name.middle)
          form.setFieldValue('lastName', data.name.last)
          form.setFieldValue('email', data.emails[0])
          form.setFieldValue('phone', data.phoneNumbers[0])
          form.setFieldValue('linkedinUrl', data.linkedin)
        }
      }
    },
  }

  return (
    <Form form={form} className="p-4" layout="vertical">
      <Form.Item
        name="file"
        valuePropName="file"
        rules={[{ required: true, message: 'Please upload your resume!' }]}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} disabled={disableUpload}>
            Upload Resume
          </Button>
        </Upload>
      </Form.Item>

      <div className="flex justify-between">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input your First Name' }]}
        >
          <Input placeholder="First Name..." />
        </Form.Item>
        <Form.Item name="middleName" label="Midle Name">
          <Input placeholder="Middle Name..." />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your Last Name' }]}
        >
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
        <Button type="primary" htmlType="submit" className="w-40">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
