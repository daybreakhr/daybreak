import { EnvironmentOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Job } from 'utils/utils'

type JobCardProps = {
  job: Job
  workspaceSlug: string
}

export function JobCard({ job, workspaceSlug }: JobCardProps) {
  return (
    <div
      key={job.id}
      className="p-6 my-2 border border-gray-800 rounded-md shadow-md"
    >
      <a
        className="mb-1 text-xl font-semibold"
        href={`/${workspaceSlug}/jobs/${job.id}`}
      >
        {job.title}
      </a>
      <div className="flex flex-wrap items-center py-4">
        <div className="flex-1 min-w-fit">
          <div className="flex flex-wrap space-x-4">
            <span>Full time</span>
            <div className="pl-2 space-x-2">
              <EnvironmentOutlined />
              <span>
                {job.isRemote ? 'Remote' : 'In-office'}
                {`: ${job.Location.name}`}
              </span>
            </div>
          </div>
          <span>3-5 years of experience</span>
        </div>
        <Button
          type="primary"
          className="self-end m-2"
          ghost
          href={`/${workspaceSlug}/jobs/${job.id}`}
        >
          Apply for this role
        </Button>
      </div>
    </div>
  )
}

export default JobCard
