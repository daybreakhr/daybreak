import { Button, Checkbox, Form, Input, InputNumber, Select, Steps } from 'antd'
import Editor from 'components/editor'
import { AiOutlineRight } from 'react-icons/ai'
import {
  jobTypeOptions,
  departmentOptions,
  locationOptions,
  experienceOptions,
  skillList,
  currency_list,
} from './constants/create-job-values'

export default function CreateJobs() {
  return (
    <div className="p-8">
      <div className="p-6 bg-white rounded-md shadow-md mb-6">
        <Steps current={0}>
          <Steps.Step
            title="Create Job"
            description="Enter detailed job description"
          />
          <Steps.Step
            title="Publish Job"
            description="Post job on various platforms"
          />
        </Steps>
      </div>

      <div className="px-6 pt-6 bg-white rounded-md shadow-md">
        <p className="font-medium font-sans text-xl">Create New Job</p>
        <Form
          layout="vertical"
          initialValues={{
            skills: ['HTML', 'CSS', 'JavaScript', 'React'],
            experience: '< 3 years',
            currency: 'Indian Rupee (₹)',
          }}
        >
          <Form.Item
            label="Job Title"
            name="title"
            rules={[{ required: true, message: 'Job-Title is required!' }]}
          >
            <Input placeholder="Job Title..." />
          </Form.Item>
          <div className="flex items-center w-full space-x-4">
            <Form.Item
              label="Department"
              name="department"
              className="flex-1"
              rules={[{ required: true, message: 'Please select department' }]}
            >
              <Select
                placeholder="Select Department..."
                options={departmentOptions}
              />
            </Form.Item>

            <Form.Item
              label="Job Type"
              name="type"
              className="flex-1"
              rules={[{ required: true, message: 'Please select Job Type' }]}
            >
              <Select placeholder="Job Type..." options={jobTypeOptions} />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              className="flex-1"
              rules={[{ required: true, message: 'Please select location' }]}
            >
              <Select
                placeholder="Select Office Location..."
                options={locationOptions}
              />
            </Form.Item>

            <Form.Item
              label=" "
              name="isRemote"
              className="flex-1"
              valuePropName="checked"
            >
              <Checkbox>Mark as Remote Job</Checkbox>
            </Form.Item>
          </div>

          <Editor />

          <div className="flex items-center w-full space-x-4">
            <Form.Item
              label="Skills"
              name="skills"
              className="flex-1"
              rules={[
                { required: true, message: 'Please choose required skills' },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="Please select required skills"
                options={skillList}
              />
            </Form.Item>

            <Form.Item
              label="Experience"
              name="experience"
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: 'Please choose required experience',
                },
              ]}
            >
              <Select
                placeholder="Select Experience Required..."
                options={experienceOptions}
              />
            </Form.Item>
          </div>

          <div className="flex items-center w-full space-x-4">
            <Form.Item label="Currency" name="currency" className="flex-1">
              <Select
                showSearch
                options={currency_list}
                placeholder="Select Currency..."
              />
            </Form.Item>

            <Form.Item label="Min Salary" name="minSalary" className="flex-1">
              <InputNumber
                placeholder="Enter Min Salary..."
                className="!w-full"
              />
            </Form.Item>

            <Form.Item label="Max Salary" name="maxSalart" className="flex-1">
              <InputNumber
                placeholder="Enter Max Salary..."
                className="!w-full"
              />
            </Form.Item>
          </div>
          <div className="flex justify-end pt-4">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <span>Continue</span>
                <AiOutlineRight />
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}
