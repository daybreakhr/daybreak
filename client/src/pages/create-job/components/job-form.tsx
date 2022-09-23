import { debounce } from 'lodash'
import { useParams } from 'react-router-dom'
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Spin,
} from 'antd'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import Editor from 'components/editor'
import {
  fetchDepartments,
  fetchJobById,
  fetchLocations,
  updateJobById,
} from '../queries'
import {
  jobTypeOptions,
  experienceOptions,
  skillList,
  currency_list,
  jobPriority,
} from '../constants/create-job-values'
import { Job } from 'types/job'
import { Descendant } from 'slate'

type JobFormProps = {
  onSubmit: () => void
}

export default function JobForm({ onSubmit }: JobFormProps) {
  const [form] = Form.useForm()
  const { jobId = '' } = useParams()
  const queryClient = useQueryClient()

  const [
    { data: locations, isLoading: isLocationsLoading },
    { data: departments, isLoading: isDepartmentsLoading },
    { data: job, isLoading: isJobLoading },
  ] = useQueries({
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

  const { mutate: updateJob } = useMutation(updateJobById, {
    onSuccess: () => {
      queryClient.invalidateQueries(['job', jobId])
      message.success('Successfully saved form data!')
    },
  })

  const handleSubmit = (values: any) => {
    updateJob({ jobId, updateJobDto: values })
  }

  if (isDepartmentsLoading || isJobLoading || isLocationsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <div className="flex items-center space-x-4">
        <Form.Item
          name="title"
          label="Job Title"
          className="flex-1"
          rules={[{ required: true, message: 'Job-Title is required!' }]}
        >
          <Input placeholder="Job Title..." />
        </Form.Item>

        <Form.Item name="priority" label="Priority" className="w-48">
          <Select placeholder="Select Job Priority" options={jobPriority} />
        </Form.Item>
      </div>

      <div className="flex items-center w-full space-x-4">
        <Form.Item
          label="Department"
          name="departmentId"
          className="flex-1"
          rules={[{ required: true, message: 'Please select department' }]}
        >
          <Select
            placeholder="Select Department..."
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

      <Editor
        initialValue={job?.description as Descendant[]}
        onChange={debounce(
          (description) => updateJob({ jobId, updateJobDto: { description } }),
          2000,
        )}
      />

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
          <InputNumber
            placeholder="Enter Min Salary..."
            className="!w-full"
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />
        </Form.Item>

        <Form.Item label="Max Salary" name="maxSalary" className="flex-1">
          <InputNumber
            placeholder="Enter Max Salary..."
            className="!w-full"
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
          />
        </Form.Item>
      </div>

      <div className="flex items-center justify-end space-x-3">
        <Button htmlType="submit">Save Draft</Button>

        <Button
          type="primary"
          htmlType="button"
          onClick={() => {
            form.submit()
            onSubmit()
          }}
        >
          Continue
        </Button>
      </div>
    </Form>
  )
}
