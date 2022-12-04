import { Spin, Tag, Typography } from 'antd'
import { Descendant } from 'slate'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { WalletOutlined } from '@ant-design/icons'
import { Reader, Show } from 'ui-kit'

import PageHeader from 'components/page-header'
import { fetchJob } from './queries'
import JobSummary from './components/job-summary'

export default function Job() {
  const { jobId = '' } = useParams()

  const { data, isLoading } = useQuery(['job', jobId], () => fetchJob(jobId))
  const { Title } = Typography

  const title = (
    <>
      <span className="mr-2">{data?.title ?? ''}</span>
      <Tag color={data?.isPublished ? 'green' : 'red'}>
        {data?.isPublished ? 'Published' : 'Draft'}
      </Tag>
    </>
  )

  return (
    <>
      <PageHeader
        isLoading={isLoading}
        title={title}
        breadcrumb={[
          { label: 'Jobs', path: '/jobs', icon: <WalletOutlined /> },
          { label: 'Job', path: `/jobs/${jobId}` },
        ]}
      />
      <div className="px-8 pt-4 pb-8">
        <div className="flex space-x-4">
          <div className="flex-1 p-4 bg-white rounded-md shadow-md">
            <Show when={data?.skills}>
              <Title level={5}>Skills</Title>
              {data?.skills.map((skill, index) => (
                <Tag key={index} color="purple">
                  {skill}
                </Tag>
              ))}
            </Show>

            <Show
              when={!isLoading}
              fallback={
                <div className="flex items-center justify-center h-full">
                  <Spin tip="Loading Job..." />
                </div>
              }
            >
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
    </>
  )
}
