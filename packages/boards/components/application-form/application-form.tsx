import { useState } from 'react'
import { useRouter } from 'next/router'
import type { UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import type { RcFile, UploadFile } from 'antd/lib/upload'
import { Button, Form, Input, message, Upload } from 'antd'
import { createCandidate, CreateCandidateBody } from 'queries'

type ApplicationFormProps = {
  workspaceId: string
}

export default function ApplicationForm({ workspaceId }: ApplicationFormProps) {
  const { query, push } = useRouter()
  const [form] = Form.useForm()
  const [disableUpload, setDisableUpload] = useState(false)

  const { mutate, isLoading } = useMutation(createCandidate, {
    onSuccess: () => {
      form.resetFields()
      setDisableUpload(false)
      message.success('Successfully applied for the job!')
      push(`/${query.slug}`)
    },
    onError: (error: any) => {
      const errMsg = error?.response?.data?.error
      if (errMsg) {
        message.error(errMsg)
      }
    },
  })

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
          form.setFieldValue('location', data.location?.city)
          form.setFieldValue('linkedInUrl', data.linkedin)
          form.setFieldValue('affindaId', file.response.meta.identifier)
        }
      }
    },
  }

  function handleSubmit(
    values: Omit<CreateCandidateBody, 'jobId'> & { file: { file: UploadFile } },
  ) {
    const formData = new FormData()
    const { file, ...restValues } = values
    formData.append('file', file.file.originFileObj as RcFile)
    formData.append('jobId', (query.jobId as string) ?? '')

    Object.keys(restValues).forEach((key) => {
      const value = restValues[key as keyof typeof restValues]
      if (value) {
        formData.append(key, value)
      }
    })

    mutate({ workspaceId, body: formData })
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="affindaId" hidden />
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

      <div className="flex justify-between space-x-4">
        <Form.Item
          name="firstName"
          label="First Name"
          className="flex-1"
          rules={[{ required: true, message: 'Please input your First Name' }]}
        >
          <Input placeholder="First Name..." />
        </Form.Item>
        <Form.Item name="middleName" label="Midle Name" className="flex-1">
          <Input placeholder="Middle Name..." />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          className="flex-1"
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
        <Input placeholder="Enter your Email..." />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
        required
      >
        <Input placeholder="Enter your Phone Number..." />
      </Form.Item>

      <Form.Item
        name="location"
        label="City / Country"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
        required
      >
        <Input placeholder="Enter your current location..." />
      </Form.Item>

      <Form.Item
        name="linkedInUrl"
        label="Linkedin Profile URL"
        rules={[
          { type: 'url', message: 'The input is not a valid URL!' },
          { required: true, message: 'Please input your LinkedIn URL' },
        ]}
      >
        <Input placeholder="https://linkedin.com/in/username" />
      </Form.Item>

      <div className="flex items-center justify-center">
        <Form.Item>
          <Button
            type="primary"
            className="w-40"
            htmlType="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
