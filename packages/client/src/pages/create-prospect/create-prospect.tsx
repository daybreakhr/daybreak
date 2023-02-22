import Dragger from 'antd/es/upload/Dragger'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, message, Select, UploadProps } from 'antd'
import { InboxOutlined, TeamOutlined } from '@ant-design/icons'
import PageHeader from 'components/page-header'
import { fetchJobs } from 'pages/jobs/queries'

import { RcFile } from 'antd/es/upload'
import { createProspect } from './queries'

export default function CreateProspect() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const { data: jobs } = useQuery(['jobs'], fetchJobs)

  const publishedJobs = jobs?.filter(({ departmentId }) => !!departmentId)

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(createProspect, {
    onSuccess: () => {
      form.resetFields()
      queryClient.invalidateQueries(['prospects'])
      navigate('/prospects')
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
    const { file, jobIds, ...restValues } = values

    Object.keys(restValues).forEach((key) => {
      const value = restValues[key as keyof typeof restValues]
      if (value) {
        formData.append(key, value)
      }
    })

    formData.append('file', file.file as RcFile)
    jobIds.forEach((item: string) => formData.append('jobIds[]', item))

    mutateAsync(formData)
  }

  const uploadProps: UploadProps = {
    maxCount: 1,
    beforeUpload: () => false,
  }

  return (
    <>
      <PageHeader
        title="Add Prospect"
        breadcrumb={[
          { label: 'Prospects', path: '/prospects', icon: <TeamOutlined /> },
          { label: 'New Prospect', path: '/prospects/create' },
        ]}
      />

      <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
        <div className="p-6 bg-white rounded-md shadow-md">
          <Form
            layout="vertical"
            className="mx-64"
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="file"
              valuePropName="file"
              label="Upload Resume"
              rules={[
                { required: true, message: 'Please upload your resume!' },
              ]}
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

            <Form.Item name="jobIds" label="Jobs" className="flex-1">
              <Select
                allowClear
                mode="multiple"
                placeholder="Select all the suitable Jobs..."
                options={publishedJobs?.map(({ id, title }) => {
                  return { label: title, value: id }
                })}
              />
            </Form.Item>

            <hr className="mt-2 mb-6" />

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
              <Form.Item
                name="middleName"
                label="Midle Name"
                className="flex-1"
              >
                <Input placeholder="Middle Name..." />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Last Name"
                className="flex-1"
                rules={[
                  { required: true, message: 'Please input your Last Name' },
                ]}
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
              <Form.Item name="phone" className="flex-1" label="Phone Number">
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
        </div>
      </div>
    </>
  )
}
