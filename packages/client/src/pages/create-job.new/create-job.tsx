import { Checkbox, Form, Input, Select, Button, Tag } from 'antd'
import { HiSparkles, HiArrowRight } from 'react-icons/hi'

import Stepper from './components/stepper'
import AdditionalDetails from './components/additional-details'
import TextEditor from './components/text-editor'

import { jobTypeOptions } from './constants/create-job-values'

export default function CreateJob() {
  return (
    <div className="flex flex-col h-full py-12 overflow-scroll bg-white ">
      <Form layout="vertical" className="w-full max-w-4xl mx-auto">
        <Stepper />
        <p className="mb-3 text-xl font-semibold text-center">
          Job Details Page
        </p>

        <div className="flex items-center justify-between mb-1">
          <p className="font-semibold">Job Title</p>
          <p className="text-gray-500">Required</p>
        </div>
        <Form.Item>
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

            <Form.Item style={{ marginBottom: 0 }}>
              <Select size="large" placeholder="Assign Hiring Manager" />
            </Form.Item>
          </div>

          <div className="flex-1">
            <p className="mb-1 font-semibold">Location</p>

            <Form.Item style={{ marginBottom: '6px' }}>
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

            <Form.Item>
              <Select size="large" placeholder="Assign Hiring Manager" />
            </Form.Item>
          </div>

          <div className="flex-1">
            <p className="mb-1 font-semibold">Department</p>

            <Form.Item>
              <Select size="large" placeholder="Select Location" />
            </Form.Item>
          </div>
        </div>
        <div className="flex-1">
          <p className="mb-1 font-semibold">Add Skills</p>
          <Form.Item>
            <Select size="large" mode="tags" placeholder="Add Skills" />

            <Tag closable className="rounded-full py-1 px-3 mt-3">
              HTML
            </Tag>
            <Tag closable className="rounded-full py-1 px-3 mt-3">
              CSS
            </Tag>
            <Tag closable className="rounded-full py-1 px-3 mt-3">
              UI/UX
            </Tag>
          </Form.Item>
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <p className="mb-1 font-semibold">Job Description</p>
            <Form.Item>
              <Button
                size="middle"
                icon={<HiSparkles className="text-primary-500 mr-1" />}
                className="text-primary-500"
              >
                Generate with Al
              </Button>
            </Form.Item>
          </div>
          <TextEditor />
        </div>
        <div>
          <AdditionalDetails />
        </div>

        <div className="flex items-center justify-center mt-8">
          <Button className="bg-primary-500 text-white py-6 px-10 center">
            Setup Interview Rounds <HiArrowRight className="ml-5" />
          </Button>
        </div>
      </Form>
    </div>
  )
}
