import { useMemo } from 'react'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import type { Descendant } from 'slate'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Spin,
} from 'antd'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { Job } from 'types/job'
import { Editor } from 'ui-kit'
import { fetchJob } from 'pages/job/queries'
import { fetchMembers } from 'pages/members/queries'
import {
  fetchDepartments,
  fetchJobTemplates,
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

dayjs.extend(weekday)
dayjs.extend(localeData)

export default function JobForm() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { jobId = '' } = useParams()
  const queryClient = useQueryClient()

  const [
    { data: templates, isLoading: isTemplatesLoading },
    { data: locations, isLoading: isLocationsLoading },
    { data: departments, isLoading: isDepartmentsLoading },
    { data: job, isLoading: isJobLoading },
    { data: members, isLoading: isMembersLoading },
  ] = useQueries({
    queries: [
      { queryKey: ['templates'], queryFn: fetchJobTemplates },
      { queryKey: ['locations'], queryFn: fetchLocations },
      { queryKey: ['departments'], queryFn: fetchDepartments },
      {
        queryKey: ['job', jobId],
        queryFn: () => fetchJob(jobId),
        onSuccess(data: Job) {
          const { hireBy, ...restData } = data
          form.setFieldsValue(restData)
          if (hireBy) {
            form.setFieldValue('hireBy', dayjs(hireBy, 'DD-MM-YYYY'))
          }
        },
      },
      { queryKey: ['members'], queryFn: fetchMembers },
    ],
  })

  const { mutate: updateJob } = useMutation(updateJobById)

  const membersList = useMemo(
    () =>
      members?.map(({ uid, photoURL, displayName }) => ({
        value: uid,
        label: (
          <div className="flex items-center space-x-2">
            <Avatar src={photoURL} size="small" className="flex-none">
              {displayName?.charAt(0)}
            </Avatar>
            <p className="truncate" title={displayName ?? ''}>
              {displayName}
            </p>
          </div>
        ),
      })) ?? [],
    [members],
  )

  const handleSubmit = (values: any) => {
    updateJob(
      { jobId, updateJobDto: values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['job', jobId])
          message.success('Successfully saved form data!')
        },
      },
    )
  }

  if (
    isDepartmentsLoading ||
    isJobLoading ||
    isLocationsLoading ||
    isTemplatesLoading ||
    isMembersLoading
  ) {
    return (
      <div className="flex items-center justify-center h-96">
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

        <Form.Item
          name="hiringManager"
          className="w-64"
          label="Hiring Manager"
          rules={[{ required: true, message: 'Please select Hiring Manager' }]}
        >
          <Select
            showSearch
            options={membersList}
            filterOption={(input, option) => {
              const member = members?.find(({ uid }) => uid === option?.value)
              if (member) {
                return !!member.displayName
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              } else {
                return false
              }
            }}
            placeholder="Select Hiring Manager"
          />
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

      <p className="mb-2">Job Description</p>
      <Editor
        templates={templates ?? []}
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
            { required: true, message: 'Please choose required experience' },
          ]}
        >
          <Select
            placeholder="Select Experience Required..."
            options={experienceOptions}
          />
        </Form.Item>

        <Form.Item name="hireBy" label="Hire By" className="w-64">
          <DatePicker
            className="w-full"
            format="DD-MM-YYYY"
            placeholder="Select Target Date..."
            disabledDate={(current) =>
              current && current < dayjs().endOf('day')
            }
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
            form.validateFields().then((values) => {
              handleSubmit(values)
              navigate(`/jobs/${jobId}/publish`)
            })
          }}
        >
          Continue
        </Button>
      </div>
    </Form>
  )
}
