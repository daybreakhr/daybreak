import { Link } from 'react-router-dom'
import { RxDotFilled } from 'react-icons/rx'
import { Job } from 'types/job'
import { Switch } from 'ui-kit'

type JobCardProps = {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link to={`${job.id}`} className="p-4 bg-white rounded-md shadow">
      <div className="flex items-center mb-2 space-x-4">
        <Switch>
          <Switch.Match when={job.isPublished}>
            <div className="flex items-center px-2 py-1 space-x-0.5 text-xs font-medium rounded-md cursor-pointer bg-success-50 text-success-600">
              <RxDotFilled /> <span>Published</span>
            </div>
          </Switch.Match>

          <Switch.Match when={!job.isPublished}>
            <div className="flex items-center px-2 py-1 space-x-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md cursor-pointer">
              <RxDotFilled /> <span>Draft</span>
            </div>
          </Switch.Match>
        </Switch>
        <p className="text-xs text-gray-600">#{job.Department?.name}</p>
      </div>
      <p className="text-lg font-semibold">{job.title}</p>
    </Link>
  )
}
