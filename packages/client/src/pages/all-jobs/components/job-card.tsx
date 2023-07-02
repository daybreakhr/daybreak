import dayjs from 'dayjs'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { capitalize, words } from 'lodash'
import { RxDotFilled } from 'react-icons/rx'

import { Job } from 'types/job'
import { MemberWithUserInfo } from 'types/member'
import { Show, Switch } from 'ui-kit'
import formatNumber from 'utils/format-number'
import { ReactComponent as CandidatesIcon } from 'assets/icons/candidates.svg'
import { HiOutlineStar, HiStar } from 'react-icons/hi'

import useAuth from 'hooks/use-auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchJob } from 'pages/job/queries'
import { updateJobById } from 'pages/create-job/queries'

type JobCardProps = {
  job: Job
  members: MemberWithUserInfo[]
}

export default function JobCard({ job, members }: JobCardProps) {
  const { member } = useAuth()
  const jobId = job.id

  const recruiter = members.find(({ uid }) => uid === job.createdBy)
  const { data } = useQuery(['job', jobId], () => fetchJob(jobId))

  const isJobStarred = data?.favorites.includes(member?.uid ?? '')

  const queryClient = useQueryClient()
  const { mutate } = useMutation(updateJobById, {
    onMutate: async ({ jobId, updateJobDto }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['job', jobId])
      // Snapshot the previous value
      const previousJob = queryClient.getQueryData(['job', jobId])
      // Optimistically update to the new value
      queryClient.setQueryData(['job', jobId], (old: any) => {
        return { ...old, ...updateJobDto }
      })
      // Return a context object with the snapshotted value
      return { previousJob, jobId }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(['job', context.jobId], context.previousJob)
      }
    },
    // Always refetch after error or success:
    onSettled: () => queryClient.invalidateQueries(['job', jobId]),
    onSuccess: () => {
      queryClient.invalidateQueries(['favorite-jobs'])
    },
  })

  function handleStarChange() {
    if (data && member) {
      if (isJobStarred) {
        mutate({
          jobId,
          updateJobDto: {
            favorites: data?.favorites.filter((uid) => uid !== member.uid),
          },
        })
      } else {
        mutate({
          jobId,
          updateJobDto: {
            favorites: [...data.favorites, member.uid],
          },
        })
      }
    }
  }

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

        <div>
          <button
            onClick={handleStarChange}
            className="p-1 text-lg bg-transparent border rounded-md"
          >
            <Show
              when={isJobStarred}
              fallback={
                <HiOutlineStar strokeWidth="1" className="text-gray-500" />
              }
            >
              <HiStar className="text-yellow-500" strokeWidth={1} />
            </Show>
          </button>
        </div>
        <span className="text-xs text-gray-600">
          {dayjs(job.createdAt).fromNow()}
        </span>
      </div>

      <p className="mb-1 text-lg font-semibold">{job.title}</p>

      <div className="flex items-center mb-4 space-x-1 text-base text-gray-500">
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

      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-gray-500">
          <CandidatesIcon />
          <p>
            <span className="font-medium text-gray-800">
              {job._count.Candidate}
            </span>{' '}
            Candidates
          </p>
        </div>

        <Show when={recruiter}>
          {({ displayName, photoURL }) => (
            <div className="flex items-center space-x-1">
              <Avatar size="small" src={photoURL} />
              <span>{displayName}</span>
            </div>
          )}
        </Show>
      </div>
    </Link>
  )
}
