import { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import Editor from 'components/editor'
import {
  createDepartment,
  fetchDepartments,
  fetchJobById,
  fetchLocations,
} from '../queries'
import {
  jobTypeOptions,
  experienceOptions,
  skillList,
  currency_list,
} from '../constants/create-job-values'
import { useParams } from 'react-router-dom'
import { Job } from 'types/job'

type JobFormProps = {
  onSubmit: () => void
}

export default function JobForm({ onSubmit }: JobFormProps) {
  const [form] = Form.useForm()
  const { jobId = '' } = useParams()
  const queryClient = useQueryClient()
  const [searchDepartment, setSearchDepartment] = useState('')

  const [{ data: locations }, { data: departments }] = useQueries({
    queries: [
      { queryKey: ['locations'], queryFn: fetchLocations },
      { queryKey: ['departments'], queryFn: fetchDepartments },
      {
        queryKey: ['job', jobId],
        queryFn: () => fetchJobById(jobId),
        onSuccess(data: Job) {
          form.setFieldsValue(data)
        },
      },
    ],
  })

  const { mutate: addDepartment } = useMutation(createDepartment, {
    onSuccess: () => queryClient.invalidateQueries(['departments']),
  })

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        // eslint-disable-next-line no-console
        console.log(values)
        onSubmit()
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
          name="departmentId"
          className="flex-1"
          rules={[{ required: true, message: 'Please select department' }]}
        >
          <Select
            showSearch
            onSearch={setSearchDepartment}
            placeholder="Select Department..."
            notFoundContent={
              <button
                className="w-full text-gray-800 text-left"
                onClick={() => addDepartment({ name: searchDepartment })}
              >
                <span className="text-gray-400">Create:</span>{' '}
                {searchDepartment}
              </button>
            }
            filterOption={(input, option) =>
              option!.label.toLowerCase().includes(input.toLowerCase())
            }
            options={departments?.map(({ name, id }) => {
              return { label: name, value: id }
            })}
          />
        </Form.Item>

        <Form.Item
          label="Job Type"
          name="jobType"
          className="flex-1"
          rules={[{ required: true, message: 'Please select Job Type' }]}
        >
          <Select placeholder="Job Type..." options={jobTypeOptions} />
        </Form.Item>

        <Form.Item
          label="Location"
          name="locationId"
          className="flex-1"
          rules={[{ required: true, message: 'Please select location' }]}
        >
          <Select
            placeholder="Select Office Location..."
            options={locations?.map(({ id, name }) => {
              return { label: name, value: id }
            })}
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
          rules={[{ required: true, message: 'Please choose required skills' }]}
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
          <InputNumber placeholder="Enter Min Salary..." className="!w-full" />
        </Form.Item>

        <Form.Item label="Max Salary" name="maxSalary" className="flex-1">
          <InputNumber placeholder="Enter Max Salary..." className="!w-full" />
        </Form.Item>
      </div>

      <div className="flex items-center justify-end">
        <Button type="primary" htmlType="submit">
          <span>Continue</span>
          <AiOutlineRight />
        </Button>
      </div>
    </Form>
  )
}
