import { useMemo } from 'react'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import { RightOutlined } from '@ant-design/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import { RemirrorEditor } from 'ui-kit'

import { fetchJob } from 'pages/job/queries'
import { MemberWithUserInfo } from 'types/member'
import { fetchMembers } from 'pages/members/queries'
import { fetchDepartments, fetchLocations, updateJobById } from './queries'
import {
  jobTypeOptions,
  experienceOptions,
  currency_list,
  jobPriority,
} from './constants/create-job-values'
import GenerateDescription from './components/generate-description'
import DepartmentSelect from './components/department-select'
import LocationSelect from './components/location-select'
import SkillSelect from './components/skill-select'

dayjs.extend(weekday)
dayjs.extend(localeData)

export default function JobForm() {
  const [form] = Form.useForm()
  const jobTitle = Form.useWatch('title', form)
  const navigate = useNavigate()
  const { jobId = '' } = useParams()
  const { pathname } = useLocation()
  const titlePrefix = pathname.split('/')[3]

  const [
    { data: locations, isLoading: isLocationsLoading },
    { data: departments, isLoading: isDepartmentsLoading },
    { data: job, isLoading: isJobLoading },
    { data: members, isLoading: isMembersLoading },
  ] = useQueries({
    queries: [
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

  const queryClient = useQueryClient()
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
    isMembersLoading
  ) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="flex flex-col h-full"
    >
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
              const member: MemberWithUserInfo | undefined = members?.find(
                ({ uid }) => uid === option?.value,
              )
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
          <DepartmentSelect
            form={form}
            initialOptions={departments?.map(({ name, id }) => {
              return { label: name, value: id }
            })}
          />
        </Form.Item>

        <Form.Item
          name="jobType"
          label="Job Type"
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
          <LocationSelect
            form={form}
            placeholder="Select Office Location..."
            initialOptions={locations?.map(({ id, name }) => {
              return { label: name, value: id }
            })}
          />
        </Form.Item>

        <Form.Item label=" " name="isRemote" valuePropName="checked">
          <Checkbox>Mark as Remote Job</Checkbox>
        </Form.Item>
      </div>

      <p className="mb-2">Job Description</p>
      <div className="flex flex-col flex-1 mb-4">
        <RemirrorEditor
          initialContent={job?.description ?? ''}
          toolbarExtra={<GenerateDescription jobTitle={jobTitle} />}
          handleChange={debounce(
            (description) =>
              updateJob({ jobId, updateJobDto: { description } }),
            2000,
          )}
        />
      </div>

      <div className="flex items-center w-full space-x-4">
        <Form.Item
          label="Skills"
          name="skills"
          className="flex-1"
          rules={[{ required: true, message: 'Please choose required skills' }]}
        >
          <SkillSelect form={form} placeholder="Select Office Location..." />
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
              navigate(`/jobs/${jobId}/${titlePrefix}/2`)
            })
          }}
        >
          Continue
          <RightOutlined />
        </Button>
      </div>
    </Form>
  )
}
