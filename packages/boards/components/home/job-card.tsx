import { EnvironmentOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ExperienceLevel, Job, JobTypes } from 'utils/utils'

type JobCardProps = {
  job: Job
  workspaceSlug: string
}

export default function JobCard({ job, workspaceSlug }: JobCardProps) {
  return (
    <div
      key={job.id}
      className="p-6 my-2 border border-gray-300 rounded-md shadow-md"
    >
      <a
        className="text-lg font-medium text-primary-main"
        href={`/${workspaceSlug}/jobs/${job.id}`}
      >
        {job.title}
      </a>
      <div className="flex flex-wrap items-center pt-4">
        <div className="flex-1 space-y-2 min-w-fit">
          <div className="flex flex-wrap space-x-4">
            <span>{job.jobType && JobTypes[job.jobType]}</span>
            <div className="pl-2 space-x-2">
              <EnvironmentOutlined />
              <span>
                {job.isRemote ? 'Remote' : 'In-office'}
                {`: ${job.Location.name}`}
              </span>
            </div>
          </div>
          {job.experience && (
            <p>{`${(ExperienceLevel as any)[job.experience]} of experience`}</p>
          )}
        </div>
        <Button
          type="primary"
          className="self-end my-2"
          ghost
          href={`/${workspaceSlug}/jobs/${job.id}`}
        >
          Apply for this role
        </Button>
      </div>
    </div>
  )
}
