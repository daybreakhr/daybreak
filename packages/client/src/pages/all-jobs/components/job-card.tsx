import { Link } from 'react-router-dom'
import { RxDotFilled } from 'react-icons/rx'
import { Job } from 'types/job'
import { Show, Switch } from 'ui-kit'
import { capitalize, words } from 'lodash'
import formatNumber from 'utils/format-number'
import dayjs from 'dayjs'

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
        <span className="text-xs text-gray-600">#{job.Department?.name}</span>

        <div className="flex-1" />

        <span className="text-xs text-gray-600">
          {dayjs(job.createdAt).fromNow()}
        </span>
      </div>

      <p className="mb-1 text-lg font-semibold">{job.title}</p>

      <div className="flex items-center space-x-1 text-gray-500">
        <span>
          {words(job.jobType ?? '')
            .map((val) => capitalize(val))
            .join(' ')}{' '}
          {job.isRemote ? '(Remote)' : null}
        </span>
        <RxDotFilled />
        <span>{job.Location?.name}</span>
        <Show when={job.minSalary}>
          {(value) => (
            <>
              <RxDotFilled />
              {formatNumber(value)}
            </>
          )}
        </Show>{' '}
        <Show when={job.maxSalary}>
          {(value) => `- ${formatNumber(value)}`}
        </Show>
        <RxDotFilled />
        <span>{job.experience}</span>
        <RxDotFilled />
        <span>{capitalize(job.priority)} Priority</span>
      </div>
    </Link>
  )
}
