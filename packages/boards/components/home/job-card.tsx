import { Button } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import { ExperienceLevel, Job, JobTypes } from 'utils/utils'

type JobCardProps = {
  job: Job
  workspaceSlug: string
}

export default function JobCard({ job, workspaceSlug }: JobCardProps) {
  return (
    <div
      key={job.id}
      className="p-4 my-2 border border-gray-300 rounded-md shadow-md md:p-6"
    >
      <a
        href={`/${workspaceSlug}/jobs/${job.id}`}
        className="text-lg font-medium text-primary-500"
      >
        {job.title}
      </a>

      <div className="flex flex-col flex-wrap pt-4 md:flex-row">
        <div className="flex-1 space-y-2">
          <div className="flex space-x-4 ">
            <span>{job.jobType && JobTypes[job.jobType]}</span>
            <div className="pr-2 space-x-2">
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
          ghost
          type="primary"
          href={`/${workspaceSlug}/jobs/${job.id}`}
          className="self-start mt-4"
        >
          Apply for this role
        </Button>
      </div>
    </div>
  )
}
