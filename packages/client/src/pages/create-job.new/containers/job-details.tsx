import {
  Checkbox,
  Form,
  Input,
  Select,
  Button,
  FormInstance,
  DatePicker,
  Space,
  InputNumber,
  Avatar,
  Spin,
  message,
} from 'antd'
import { useEffect, useMemo } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import { useQueries, useQueryClient, useMutation } from '@tanstack/react-query'
import { RemirrorEditor } from 'ui-kit'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import { Job } from 'types/job'

import { fetchJob } from 'pages/job/queries'
import { MemberWithUserInfo } from 'types/member'
import { fetchMembers } from 'pages/members/queries'
import {
  fetchDepartments,
  fetchLocations,
  updateJobById,
  createJob,
} from '../queries'

import SkillSelect from '../components/skill-select'
import GenerateDescription from '../components/generate-description'
import DepartmentSelect from '../components/department-select'
import LocationSelect from '../components/location-select'

import {
  jobTypeOptions,
  experienceOptions,
  jobPriority,
  currency_list,
  defaultCurrency,
} from '../constants/create-job-values'

type JobDetailsProps = {
  form: FormInstance
}

dayjs.extend(weekday)
dayjs.extend(localeData)

export default function JobDetails({ form }: JobDetailsProps) {
  let jobId = ''
  const jobTitle = Form.useWatch('jobTitle', form)

  const { mutate, isLoading: isCreatingJob } = useMutation(createJob, {
    onSuccess: ({ id }) => {
      jobId = id
    },
  })

  useEffect(() => {
    mutate()
  }, [mutate])

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
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        onSuccess: (data: Job) => {
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
    isMembersLoading ||
    isCreatingJob
  ) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin tip="Loading..." />
      </div>
    )
  }

  return (
    <>
      <p className="mb-3 text-xl font-semibold text-center">Job Details Page</p>

      <div className="flex items-center justify-between mb-1">
        <p className="font-semibold">Job Title</p>
        <p className="text-gray-500">Required</p>
      </div>

      <Form.Item
        name="jobTitle"
        rules={[{ required: true, message: 'Job-Title is required!' }]}
      >
        <Input
          size="large"
          placeholder="Enter job title"
          addonBefore={
            <Form.Item
              name="jobType"
              noStyle
              rules={[{ required: true, message: 'Job-Type is required!' }]}
            >
              <Select options={jobTypeOptions} defaultValue="fullTime" />
            </Form.Item>
          }
        />
      </Form.Item>
      <div className="flex-1">
        <p className="mb-1 font-semibold">Add Skills</p>
        <Form.Item
          name="skills"
          rules={[{ required: true, message: 'Please choose required skills' }]}
        >
          <SkillSelect form={form} />
        </Form.Item>
      </div>

      <div className="flex mb-4 space-x-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Hiring Manager</p>

          <Form.Item
            style={{ marginBottom: 0 }}
            name="hiringManager"
            rules={[
              { required: true, message: 'Please select Hiring Manager' },
            ]}
          >
            <Select
              size="large"
              placeholder="Select Hiring Manager"
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
            />
          </Form.Item>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Location</p>

          <Form.Item
            style={{ marginBottom: '6px' }}
            name="locationId"
            rules={[{ required: true, message: 'Please select location' }]}
          >
            <LocationSelect
              form={form}
              placeholder="Select Office Location."
              initialOptions={locations?.map(({ id, name }) => {
                return { label: name, value: id }
              })}
            />
          </Form.Item>

          <Form.Item noStyle name="isRemote" valuePropName="checked">
            <Checkbox>Mark as Remote Job</Checkbox>
          </Form.Item>
        </div>
      </div>

      <div className="flex space-x-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Experience</p>

          <Form.Item
            name="experience"
            rules={[
              { required: true, message: 'Please choose required experience' },
            ]}
          >
            <Select
              size="large"
              placeholder="Select Experience"
              options={experienceOptions}
            />
          </Form.Item>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Department</p>

          <Form.Item
            name="departmentId"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <DepartmentSelect
              form={form}
              initialOptions={departments?.map(({ name, id }) => {
                return { label: name, value: id }
              })}
            />
          </Form.Item>
        </div>
      </div>

      <div className="flex space-x-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Hire by</p>

          <Form.Item name="hireBy" className="w-full">
            <DatePicker
              size="large"
              placeholder="Onsite Coding"
              format={'DD-MM-YYYY'}
              style={{ width: '100%' }}
              disabledDate={(current) =>
                current && current < dayjs().endOf('day')
              }
            />
          </Form.Item>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Priority</p>

          <Form.Item name="priority">
            <Select
              size="large"
              placeholder="Select Priority"
              options={jobPriority}
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex space-x-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Referal Bonus</p>

          <Form.Item name="referalBonus">
            <Input size="large" placeholder="max" />
          </Form.Item>
        </div>
        <div className="flex-1">
          <p className="mb-1 font-semibold">Salary</p>

          <div className="flex space-x-4">
            <div className="w-30">
              <Form.Item name="currency">
                <Select
                  size="large"
                  defaultValue={defaultCurrency}
                  options={currency_list}
                  value={form.getFieldValue('currency')}
                  onChange={(value) => form.setFieldValue('currency', value)}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="salaryRange" noStyle>
                <Space.Compact size="large">
                  <Form.Item name="minSalary" noStyle>
                    <InputNumber
                      placeholder="min"
                      parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                    />
                  </Form.Item>

                  <Input
                    className="text-center cursor-default w-[30%]"
                    size="large"
                    placeholder="to"
                    disabled
                  />
                  <Form.Item name="maxSalary" noStyle>
                    <InputNumber
                      placeholder="max"
                      parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                    />
                  </Form.Item>
                </Space.Compact>
              </Form.Item>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <p className="mb-1 font-semibold">Job Description</p>
        </div>
      </div>
      <div>
        <RemirrorEditor
          initialContent={job?.description ?? ''}
          placeholder="Enter Job Details"
          classNames={['h-64']}
          toolbarExtra={
            <GenerateDescription jobTitle={jobTitle} jobId={jobId} />
          }
          handleChange={debounce(
            (description) =>
              updateJob({ jobId, updateJobDto: { description } }),
            2000,
          )}
        />
      </div>

      <div className="flex items-center justify-center mt-8 space-x-3">
        <Button htmlType="submit" size="large">
          Save Draft
        </Button>

        <Button
          type="primary"
          size="large"
          onClick={() => {
            form.validateFields().then((values) => {
              handleSubmit(values)
            })
          }}
        >
          <div className="flex items-center space-x-2">
            <span>Setup Interview Rounds</span> <HiArrowRight />
          </div>
        </Button>
      </div>
    </>
  )
}
