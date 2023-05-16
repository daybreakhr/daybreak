import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import Dragger from 'antd/es/upload/Dragger'
import { useNavigate } from 'react-router-dom'
import localeData from 'dayjs/plugin/localeData'
import { CandidateStatus } from '@prisma/client'
import { InboxOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Select, UploadProps } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { storage } from 'ui-kit'
import type { RcFile } from 'antd/es/upload'
import { fetchJobs } from 'pages/jobs/queries'
import { WORKSPACE_ID } from 'utils/constants'

import { createCandidate } from '../queries'
import { candidateSources } from '../constants/source-list'

dayjs.extend(weekday)
dayjs.extend(localeData)

export default function CandidateForm() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const { data: jobs } = useQuery(['jobs'], fetchJobs)

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

  function handleSubmit(values: any) {
    const formData = new FormData()
    const { file, ...restValues } = values
    const workspaceId = storage.get(WORKSPACE_ID) ?? ''

    formData.append('file', file.file.originFileObj as RcFile)
    formData.append('workspaceId', workspaceId)

    Object.keys(restValues).forEach((key) => {
      const value = restValues[key as keyof typeof restValues]
      if (value) {
        formData.append(key, value)
      }
    })
    formData.append('status', CandidateStatus.sourced)
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
      className="max-w-3xl mx-auto"
    >
      <Form.Item name="affindaId" hidden />
      <Form.Item
        name="file"
        valuePropName="file"
        label="Upload Resume"
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
            options={jobs
              ?.filter(({ title }) => title)
              .map(({ id, title }) => {
                return { label: title, value: id }
              })}
          />
        </Form.Item>

        <Form.Item
          name="source"
          label="Source"
          className="flex-1"
          rules={[{ required: false, message: 'Please select a source' }]}
        >
          <Select placeholder="Select source..." options={candidateSources} />
        </Form.Item>
      </div>

      <hr className="mt-2 mb-6" />

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

      <div className="flex items-center space-x-4">
        <Form.Item
          name="email"
          label="E-mail"
          className="flex-1"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' },
          ]}
        >
          <Input placeholder="Enter your Email..." />
        </Form.Item>
        <Form.Item
          name="phone"
          className="flex-1"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input your phone number!' },
          ]}
        >
          <Input placeholder="Enter your Phone Number..." />
        </Form.Item>
      </div>

      <Form.Item
        name="location"
        label="City / Country"
        rules={[
          { required: true, message: 'Please input candidate location!' },
        ]}
        required
      >
        <Input placeholder="Enter your current location..." />
      </Form.Item>

      <Form.Item
        name="linkedInUrl"
        label="Linkedin Profile URL"
        rules={[{ type: 'url', message: 'The input is not a valid URL!' }]}
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
