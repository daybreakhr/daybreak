import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Skeleton, Tag, Typography } from 'antd'
import { RemirrorReader, Show } from 'ui-kit'
import { fetchJob } from 'pages/job/queries'
import JobSummary from './components/job-summary'

const { Title } = Typography

export default function JobOverview() {
  const { jobId = '' } = useParams()
  const { data, isLoading } = useQuery(['job', jobId], () => fetchJob(jobId))

  return (
    <div className="flex flex-1 px-8 pt-4 pb-8 space-x-4 overflow-y-auto">
      <div className="flex-1 p-4 bg-white rounded-md shadow-md h-fit">
        <Show
          when={!isLoading}
          fallback={
            <div className="mt-5 space-y-4">
              <Skeleton active title />
              <Skeleton active paragraph={{ rows: 5 }} />
            </div>
          }
        >
          <Show when={data?.skills}>
            <Title level={5}>Skills</Title>
            {data?.skills.map((skill, index) => (
              <Tag key={index} color="purple">
                {skill}
              </Tag>
            ))}
          </Show>
          <Show when={data?.newDescription}>
            {(data) => (
              <div className="prose max-w-none">
                <RemirrorReader html={data} />
              </div>
            )}
          </Show>
        </Show>
      </div>

      <JobSummary data={data} isLoading={isLoading} />
    </div>
  )
}
