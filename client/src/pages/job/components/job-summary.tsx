import { Modal, Switch as Toggle } from 'antd'
import dayjs from 'dayjs'
import { Location } from '@prisma/client'
import { capitalize, words } from 'lodash'
import Switch from 'components/switch-match'
import { Job } from 'types/job'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateJobById } from 'pages/create-job/queries'

type JobSummaryProps = {
  data: Job | undefined
  isLoading: boolean
}

export default function JobSummary({ data, isLoading }: JobSummaryProps) {
  const queryClient = useQueryClient()
  const { mutate, isLoading: isUpdatingJob } = useMutation(updateJobById, {
    onSuccess: () => queryClient.invalidateQueries(['job', data?.id]),
  })

  const fields = [
    {
      id: 'createdAt',
      title: 'Job Creation Date',
      value: (value: Date) => dayjs(value).format('MMM DD, YYYY'),
    },
    {
      id: 'jobType',
      title: 'Job Type',
      value: (value: string) => words(value).map(capitalize).join(' '),
    },
    {
      id: 'experience',
      title: 'Experience',
      value: (value: string) => value,
    },
    {
      id: 'Location',
      title: 'Location',
      value: (value: Location) => value.name,
    },
    {
      id: 'minSalary',
      title: 'Salary Range',
      value: () =>
        `${data?.currency?.toUpperCase()} ${data?.minSalary} - ${
          data?.maxSalary
        }`,
    },
    {
      id: 'updatedAt',
      title: 'Last Updated At',
      value: (value: Date) => dayjs(value).format('MMM DD, YYYY'),
    },
  ]

  function handleChange(checked: boolean) {
    Modal.confirm({
      title: checked
        ? 'Are you sure to publish this application?'
        : 'Move this application to draft?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      okType: checked ? 'primary' : 'danger',
      cancelText: 'Cancel',
      onOk() {
        mutate({
          jobId: data?.id ?? '',
          updateJobDto: { isPublished: checked },
        })
      },
    })
  }

  return (
    <div className="flex-none p-4 bg-white rounded-md shadow-md w-72 h-fit">
      <p className="mb-4 font-sans text-xl font-medium">Job Details</p>

      {fields.map(({ id, title, value }) => (
        <div key={id} className="mb-4">
          <p className="mb-0.5 text-gray-500">{title}</p>

          <Switch>
            <Switch.Match when={isLoading}>
              <div className="w-48 h-6 bg-gray-100 rounded animate-pulse" />
            </Switch.Match>

            <Switch.Match when={data?.[id as keyof Job]}>
              {(val: any) => value(val)}
            </Switch.Match>
          </Switch>
        </div>
      ))}

      <div className="flex items-center mb-4 space-x-2">
        <Toggle
          loading={isUpdatingJob}
          onChange={handleChange}
          checked={data?.isPublished}
        />
        <p>{data?.isPublished ? 'Active' : 'Inactive'}</p>
      </div>
    </div>
  )
}
