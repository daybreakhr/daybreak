import { Link, useParams } from 'react-router-dom'
import { Button, Modal, Switch as Toggle } from 'antd'
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Show } from 'ui-kit'

import { Job } from 'types/job'
import useAuth from 'hooks/use-auth'
import Switch from 'components/switch-match'
import { updateJobById } from 'pages/create-job/queries'
import { fields } from '../../job/constants/summary-fields'

type JobSummaryProps = {
  data: Job | undefined
  isLoading: boolean
}

export default function JobSummary({ data, isLoading }: JobSummaryProps) {
  const { member } = useAuth()
  const { jobId = '' } = useParams()
  const queryClient = useQueryClient()
  const { mutate, isLoading: isUpdatingJob } = useMutation(updateJobById, {
    onSuccess: () => queryClient.invalidateQueries(['job', data?.id]),
  })

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
    <div className="flex-none p-4 bg-white rounded-md shadow-md w-80 h-fit">
      <div className="flex items-center justify-between mb-4">
        <p className="font-sans text-xl font-medium">Job Details</p>
        <Show when={member?.role === 'admin'}>
          <Link to={`/jobs/${jobId}/edit`}>
            <Button type="primary" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
        </Show>
      </div>

      {fields(data).map(({ id, title, value }) => (
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
