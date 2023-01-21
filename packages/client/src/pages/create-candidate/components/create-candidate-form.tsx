import dayjs from 'dayjs'
import type { UploadProps } from 'antd'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message, Select } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/es/upload/Dragger'
import { fetchJobs } from 'pages/jobs/queries'
import { RcFile } from 'antd/es/upload'
import { candidateStatusOptions } from 'utils/utils'
import { createCandidate } from '../queries'

dayjs.extend(weekday)
dayjs.extend(localeData)

export default function CandidateForm() {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(createCandidate, {
    onSuccess: ({ id }) => {
      form.resetFields()
      queryClient.invalidateQueries(['candidates'])
      navigate(`/candidates/${id}`)
    },
    onError: (error: any) => {
      const errMsg = error?.response?.data?.error
      if (errMsg) {
        message.error(errMsg)
      }
    },
  })

  const { data: jobs } = useQuery(['jobs'], fetchJobs)

  function handleSubmit(values: any) {
    const formData = new FormData()
    const { file, ...restValues } = values

    formData.append('file', file.file.originFileObj as RcFile)

    Object.keys(restValues).forEach((key) => {
      const value = restValues[key as keyof typeof restValues]
      if (value) {
        formData.append(key, value)
      }
    })

    mutate(formData)
  }

  const uploadProps: UploadProps = {
    action: `${import.meta.env.VITE_AFFINDA_API_BASE_URL}resumes/`,
    headers: {
      authorization: `Bearer ${import.meta.env.VITE_AFFINDA_TOKEN}`,
    },
    maxCount: 1,
    // Use data parsed from Affinda API to auto-fill form
    onChange: ({ file }) => {
      if (file.status === 'done') {
        const { data } = file.response

        if (data) {
          form.setFieldValue('firstName', data.name?.first)
          form.setFieldValue('middleName', data.name?.middle)
          form.setFieldValue('lastName', data.name?.last)
          form.setFieldValue('email', data.emails[0])
          form.setFieldValue('phone', data.phoneNumbers[0])
          form.setFieldValue('location', data.location?.city)
          form.setFieldValue('linkedInUrl', data.linkedin)
          form.setFieldValue('jobId', data.jobId)
          form.setFieldValue('status', data.status)
          form.setFieldValue('affindaId', file.response.meta.identifier)
        }
      }
    },
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="mx-64"
    >
      <Form.Item name="affindaId" hidden />
      <p className="mb-2 font-medium">Upload Resume</p>
      <Form.Item
        name="file"
        valuePropName="file"
        className="max-w-2xl mx-auto"
        rules={[{ required: true, message: 'Please upload your resume!' }]}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">PDF, Word or Rich Text only</p>
        </Dragger>
      </Form.Item>
      <div className="flex items-center space-x-4">
        <Form.Item
          label="Job"
          name="jobId"
          className="flex-1"
          rules={[{ required: true, message: 'Please select a Job' }]}
        >
          <Select
            placeholder="Select Job..."
            options={jobs?.map(({ id, title }) => {
              return { label: title, value: id }
            })}
          />
        </Form.Item>

        <Form.Item
          label="Initial Stage"
          name="status"
          className="flex-1"
          rules={[{ required: false, message: 'Please select initial stage' }]}
        >
          <Select
            placeholder="Select initial stage..."
            options={candidateStatusOptions}
          />
        </Form.Item>
      </div>
      <p className="mb-2 font-medium">Info</p>
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
      <div className="flex items-center justify-end space-x-3">
        <Button htmlType="button" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </div>
    </Form>
  )
}
