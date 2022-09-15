import { useState } from 'react'
import { Checkbox, Form, Input } from 'antd'
import { EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function CreateJobs() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  return (
    <div className="p-8">
      <div className="p-6 bg-white rounded-md shadow-md">
        <p className="font-medium font-sans text-xl">Create New Job</p>
        <Form layout="vertical">
          <Form.Item label="Job Title" name="title">
            <Input placeholder="Job Title..." />
          </Form.Item>

          <div className="flex items-center w-full space-x-4">
            <Form.Item label="Department" name="department" className="flex-1">
              <Input placeholder="Select Department..." />
            </Form.Item>

            <Form.Item label="Job Type" name="type" className="flex-1">
              <Input placeholder="Job Type..." />
            </Form.Item>
          </div>

          <div className="flex items-center w-full space-x-4">
            <Form.Item label="Location" name="location" className="flex-1">
              <Input placeholder="Select Office Location..." />
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
            <Form.Item label="Skills" name="skills" className="flex-1">
              <Input placeholder="Select Skills Required..." />
            </Form.Item>

            <Form.Item label="Experience" name="experience" className="flex-1">
              <Input placeholder="Select Experience Required..." />
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
              <Input placeholder="Select Currency..." />
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}
