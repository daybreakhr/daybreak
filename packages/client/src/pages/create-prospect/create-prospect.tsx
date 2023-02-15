import Dragger from 'antd/es/upload/Dragger'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Form, Input, Select } from 'antd'
import { InboxOutlined, TeamOutlined } from '@ant-design/icons'
import PageHeader from 'components/page-header'
import { fetchJobs } from 'pages/jobs/queries'

export default function CreateProspect() {
  const navigate = useNavigate()
  const { data: jobs } = useQuery(['jobs'], fetchJobs)

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
          <Form layout="vertical" className="mx-64">
            <Form.Item
              name="file"
              valuePropName="file"
              label="Upload Resume"
              rules={[
                { required: true, message: 'Please upload your resume!' },
              ]}
            >
              <Dragger>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">PDF, Word or Rich Text only</p>
              </Dragger>
            </Form.Item>

            <Form.Item
              name="jobId"
              label="Jobs"
              className="flex-1"
              rules={[{ required: true, message: 'Please select a Job' }]}
            >
              <Select
                placeholder="Select all the suitable Jobs..."
                options={jobs?.map(({ id, title }) => {
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

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}
