import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { HiOutlineExternalLink, HiOutlinePencil } from 'react-icons/hi'
import { Show, Switch } from 'ui-kit'

import { Job } from 'types/job'
import useAuth from 'hooks/use-auth'
import { Member } from 'types/member'

import { fields } from '../constants/summary-fields'

type JobDetailsProps = {
  isLoading: boolean
  job: Job | undefined
  slug: string | undefined
  members: Member[] | undefined
}

export default function JobDetails({
  job,
  slug,
  members,
  isLoading,
}: JobDetailsProps) {
  const { member } = useAuth()

  return (
    <div className="px-4 py-2">
      <p className="mb-2 text-lg font-semibold">Job Details</p>

      <div className="grid grid-cols-2 mb-2">
        {fields(members).map(({ id, title, value }) => (
          <div key={id} className="mb-4">
            <p className="mb-0.5 text-gray-500">{title}</p>
            <Switch>
              <Switch.Match when={isLoading}>
                <div className="w-48 h-6 bg-gray-100 rounded animate-pulse" />
              </Switch.Match>

              <Switch.Match when={job?.[id as keyof Job]}>
                {(val: any) => value(val)}
              </Switch.Match>
            </Switch>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <Show when={member?.role === 'admin'}>
          <Link to={`/jobs/${job?.id}/edit/1`}>
            <Button
              type="primary"
              icon={<HiOutlinePencil className="anticon" />}
            >
              Edit Details
            </Button>
          </Link>
        </Show>
        <Show when={slug}>
          {(slug) => (
            <Button
              target="_blank"
              rel="noreferrer"
              href={`${import.meta.env.VITE_BOARDS_APP_URL}/${slug}/jobs/${
                job?.id
              }`}
            >
              View in Job Portal
              <HiOutlineExternalLink className="anticon" />
            </Button>
          )}
        </Show>
      </div>
    </div>
  )
}
