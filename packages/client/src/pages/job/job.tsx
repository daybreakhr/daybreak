import { Descendant } from 'slate'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Button, Spin, Tag } from 'antd'
import { EditOutlined, WalletOutlined } from '@ant-design/icons'
import { Reader, Show } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import { fetchJob } from './queries'
import JobSummary from './components/job-summary'

export default function Job() {
  const { user } = useAuth()
  const { jobId = '' } = useParams()

  const { data, isLoading } = useQuery(['job', jobId], () => fetchJob(jobId))

  return (
    <div className="px-8 pt-4 pb-8">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item key="candidates">
          <Link to="/jobs" className="space-x-1">
            <WalletOutlined />
            <span>Job List</span>
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item key="candidate">
          <span>Job</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex space-x-4">
        <div className="flex-1 p-4 bg-white rounded-md shadow-md">
          <Show
            when={!isLoading}
            fallback={
              <div className="flex items-center justify-center h-full">
                <Spin tip="Loading Job..." />
              </div>
            }
          >
            <div className="flex items-center mb-4 space-x-4">
              <p className="text-xl font-medium text-gray-600">{data?.title}</p>
              <Tag color={data?.isPublished ? 'green' : 'red'}>
                {data?.isPublished ? 'Published' : 'Draft'}
              </Tag>
              <div className="flex-1" />

              <Show when={user?.role === 'admin'}>
                <Link to={`/jobs/${jobId}/create`}>
                  <Button type="primary" icon={<EditOutlined />}>
                    Edit
                  </Button>
                </Link>
              </Show>
            </div>

            <Show when={data?.description}>
              {(description) => (
                <div className="prose-sm prose max-w-none">
                  <Reader initialValue={description as Descendant[]} />
                </div>
              )}
            </Show>
          </Show>
        </div>

        <JobSummary data={data} isLoading={isLoading} />
      </div>
    </div>
  )
}
