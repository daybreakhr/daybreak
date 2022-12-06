import { Tag } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { Outlet, useParams } from 'react-router-dom'
import { WalletOutlined } from '@ant-design/icons'

import PageHeader from 'components/page-header'
import { fetchJob } from './queries'

export default function Job() {
  const { jobId = '' } = useParams()

  const { data, isLoading } = useQuery(['job', jobId], () => fetchJob(jobId))

  const title = (
    <>
      <span className="mr-2">{data?.title ?? ''}</span>
      <Tag color={data?.isPublished ? 'green' : 'red'}>
        {data?.isPublished ? 'Published' : 'Draft'}
      </Tag>
    </>
  )

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        isLoading={isLoading}
        title={title}
        breadcrumb={[
          { label: 'Jobs', path: '/jobs', icon: <WalletOutlined /> },
          { label: 'Job', path: `/jobs/${jobId}` },
        ]}
        tabs={[
          { label: 'Overview', key: `/jobs/${jobId}/overview` },
          { label: 'Pipeline', key: `/jobs/${jobId}/pipeline` },
        ]}
      />
      <Outlet />
    </div>
  )
}
