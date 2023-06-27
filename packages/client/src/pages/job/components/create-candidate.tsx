import { HiX } from 'react-icons/hi'
import type { RcFile } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { useNavigate, useParams } from 'react-router-dom'
import { HiArrowUpTray } from 'react-icons/hi2'
import { CandidateStatus } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Drawer, Form, Input, Select, UploadProps, message } from 'antd'

import { storage } from 'ui-kit'
import { WORKSPACE_ID } from 'utils/constants'

import { createCandidate } from '../queries'
import { candidateSources } from '../constants/source-list'

type CreateCandidateProps = {
  title: string | undefined | null
  isOpen: boolean
  onClose: () => void
}

export default function CreateCandidate({
  title,
  isOpen,
  onClose,
}: CreateCandidateProps) {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { jobId = '' } = useParams()

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
          form.setFieldValue('affindaId', file.response.meta.identifier)
        }
      }
    },
  }

  function handleSubmit() {
    form.validateFields().then((values) => {
      const formData = new FormData()
      const { file, ...restValues } = values
      const workspaceId = storage.get(WORKSPACE_ID) ?? ''

      formData.append('jobId', jobId)
      formData.append('workspaceId', workspaceId)
      formData.append('file', file.file.originFileObj as RcFile)

      Object.keys(restValues).forEach((key) => {
        const value = restValues[key as keyof typeof restValues]
        if (value) {
          formData.append(key, value)
        }
      })
      formData.append('status', CandidateStatus.sourced)
      mutate(formData)
    })
  }

  function handleClose() {
    form.resetFields()
    onClose()
  }

  return (
    <Drawer
      width={480}
      open={isOpen}
      closable={false}
      onClose={handleClose}
      footer={
        <div className="flex items-center justify-end space-x-2">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" loading={isLoading} onClick={handleSubmit}>
            Create
          </Button>
        </div>
      }
    >
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold">Create Candidate</p>
        <Button type="text" size="small" icon={<HiX />} onClick={handleClose} />
      </div>

      <hr className="my-5" />

      <p className="mb-4 text-xs text-gray-500">
        These Candidates will be added to {title}
      </p>

      <Form form={form} layout="vertical">
        <Form.Item name="affindaId" hidden />
        <Form.Item
          name="source"
          label="Source"
          rules={[{ required: false, message: 'Please select a source' }]}
        >
          <Select placeholder="Select source..." options={candidateSources} />
        </Form.Item>

        <Form.Item
          name="file"
          className="mb-4"
          valuePropName="file"
          rules={[{ required: true, message: 'Please upload your resume!' }]}
        >
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <HiArrowUpTray className="anticon" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">PDF, Word or Rich Text only</p>
          </Dragger>
        </Form.Item>

        <div className="flex justify-between space-x-4">
          <Form.Item
            name="firstName"
            label="First Name"
            className="flex-1"
            rules={[
              { required: true, message: 'Please input your First Name' },
            ]}
          >
            <Input placeholder="First Name..." />
          </Form.Item>

          <Form.Item name="middleName" label="Midle Name" className="flex-1">
            <Input placeholder="Middle Name..." />
          </Form.Item>

          <Form.Item name="lastName" label="Last Name" className="flex-1">
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

        <Form.Item name="location" label="City / Country">
          <Input placeholder="Enter your current location..." />
        </Form.Item>

        <Form.Item
          name="linkedInUrl"
          label="Linkedin Profile URL"
          rules={[{ type: 'url', message: 'The input is not a valid URL!' }]}
        >
          <Input placeholder="https://linkedin.com/in/username" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
