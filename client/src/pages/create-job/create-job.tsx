import { useState } from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {
  jobTypeOptions,
  departmentOptions,
  locationOptions,
  experienceOptions,
  currency_list,
} from './constants/create-job-values'

export default function CreateJobs() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  return (
    <div className="p-8">
      <div className="p-6 bg-white rounded-md shadow-md">
        <p className="font-medium font-sans text-xl">Create New Job</p>
        <Form layout="vertical">
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
          </div>

          <div className="flex items-center w-full space-x-4">
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

          <Editor
            editorState={editorState}
            editorClassName="border mb-4 px-4 min-h-[20rem]"
            onEditorStateChange={setEditorState}
          />

          <div className="flex items-center w-full space-x-4">
            <Form.Item
              label="Skills"
              name="skills"
              className="flex-1"
              rules={[
                { required: true, message: 'Please choose required skills' },
              ]}
            >
              <Input placeholder="Select Skills Required..." />
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
            <Form.Item label="Min Salary" name="minSalary" className="flex-1">
              <Input placeholder="Select Skills Required..." />
            </Form.Item>

            <Form.Item label="Max Salary" name="maxSalart" className="flex-1">
              <Input placeholder="Select Skills Required..." />
            </Form.Item>

            <Form.Item label="Currency" name="currency" className="flex-1">
              <Select
                showSearch
                placeholder="Select Currency..."
                options={currency_list}
              />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <Button type="default" className="mr-4">
                Save as Draft
              </Button>

              <Button type="primary" htmlType="submit">
                Create and Publish
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}
