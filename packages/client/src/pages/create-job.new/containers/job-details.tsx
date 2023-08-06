import { Checkbox, Form, Input, Select, Button, FormInstance } from 'antd'
import { HiArrowRight } from 'react-icons/hi'

import AdditionalDetails from '../components/additional-details'
import TextEditor from '../components/text-editor'
import SkillSelect from '../components/skill-select'

import {
  jobTypeOptions,
  experienceOptions,
} from '../constants/create-job-values'

type JobDetailsProps = {
  form: FormInstance
}

export default function JobDetails({ form }: JobDetailsProps) {
  return (
    <>
      <p className="mb-3 text-xl font-semibold text-center">Job Details Page</p>

      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold">Job Title</p>
        <p className="text-gray-500">Required</p>
      </div>
      <Form.Item name="jobTitle">
        <Input
          size="large"
          addonBefore={
            <Select
              size="large"
              className="w-32"
              defaultValue="fullTime"
              options={jobTypeOptions}
            />
          }
          placeholder="Enter Job Title"
        />
      </Form.Item>

      <div className="flex mb-4 space-x-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Hiring Manager</p>

          <Form.Item style={{ marginBottom: 0 }} name="hiringManager">
            <Select size="large" placeholder="Assign Hiring Manager" />
          </Form.Item>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Location</p>

          <Form.Item style={{ marginBottom: '6px' }} name="location">
            <Select size="large" placeholder="Select Location" />
          </Form.Item>

          <Form.Item noStyle name="isRemote" valuePropName="checked">
            <Checkbox>Mark as Remote Job</Checkbox>
          </Form.Item>
        </div>
      </div>

      <div className="flex space-x-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Experience</p>

          <Form.Item name="experience">
            <Select
              size="large"
              placeholder="Select Experience"
              options={experienceOptions}
            />
          </Form.Item>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Department</p>

          <Form.Item name="department">
            <Select size="large" placeholder="Select Department" />
          </Form.Item>
        </div>
      </div>
      <div className="flex-1">
        <p className="mb-1 font-semibold">Add Skills</p>
        <Form.Item name="skills">
          <SkillSelect form={form} />
        </Form.Item>
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <p className="mb-1 font-semibold">Job Description</p>
        </div>
        <TextEditor />
      </div>
      <div>
        <AdditionalDetails />
      </div>

      <div className="flex items-center justify-center mt-8">
        <Button type="primary" size="large">
          <div className="flex items-center space-x-2">
            <span>Setup Interview Rounds</span> <HiArrowRight />
          </div>
        </Button>
      </div>
    </>
  )
}
