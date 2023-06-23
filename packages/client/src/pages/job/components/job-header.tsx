import { capitalize, range } from 'lodash'
import { RxDotFilled } from 'react-icons/rx'
import { useParams } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { Candidate, CandidateStatus } from '@prisma/client'
import { HiChevronDown, HiOutlineStar, HiStar } from 'react-icons/hi'
import { Button, Divider, Dropdown, MenuProps, Popover } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import useAuth from 'hooks/use-auth'
import { Show, Switch } from 'ui-kit'
import formatNumber from 'utils/format-number'
import { fetchMembers } from 'pages/members/queries'
import { updateJobById } from 'pages/create-job/queries'
import { fetchOrganisation } from 'pages/organisation/queries'
import { ReactComponent as RupeeIcon } from 'assets/icons/rupee.svg'
import { ReactComponent as MapPinIcon } from 'assets/icons/map-pin.svg'
import { ReactComponent as BriefcaseIcon } from 'assets/icons/briefcase.svg'
import { ReactComponent as RejectCandidateIcon } from 'assets/icons/reject-candidate.svg'

import { fetchJob } from '../queries'
import JobDetails from './job-details'
import ImportTalent from './import-talent'
import { jobPriorityInfo } from '../constants/icons'

type JobHeaderProps = {
  candidates: Candidate[]
}

export default function JobHeader({ candidates }: JobHeaderProps) {
  const { member } = useAuth()
  const { jobId = '' } = useParams()

  const { data: members } = useQuery(['members'], fetchMembers)
  const { data: workspace } = useQuery(['organisation'], fetchOrganisation)
  const { data, isLoading } = useQuery(['job', jobId], () => fetchJob(jobId))

  const isJobStarred = data?.favorites.includes(member?.uid ?? '')

  const rejectedCandidates = candidates.filter(
    ({ status }) => status === CandidateStatus.rejected,
  ).length

  const candidatesInPipeline = candidates.filter(
    ({ status }) => status !== CandidateStatus.rejected,
  ).length

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

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      mutate({
        jobId: data?.id ?? '',
        updateJobDto: { isPublished: !data?.isPublished },
      })
    }
  }

  const items: MenuProps['items'] = [
    { key: '1', label: data?.isPublished ? 'Move to drafts' : 'Publish Job' },
    { key: '2', label: 'Archive Job', disabled: true },
  ]

  const { icon: priorityIcon, labelColor: priorityLabelColor } =
    jobPriorityInfo(data?.priority || '')

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
    <div className="px-6 py-4 mb-4 bg-white shadow-lg">
      <Switch>
        <Switch.Match when={isLoading}>
          <div className="h-6 mb-2 bg-gray-100 rounded w-28 animate-pulse" />
          <div className="h-6 mb-2 bg-gray-100 rounded animate-pulse w-80" />
          <div className="flex items-center space-x-2">
            {range(4).map((i) => (
              <div
                key={i}
                className="w-20 h-6 bg-gray-100 rounded animate-pulse"
              />
            ))}
          </div>
        </Switch.Match>

        <Switch.Match when={data}>
          {(job) => (
            <>
              <div className="flex items-center mb-2 space-x-3">
                <Switch>
                  <Switch.Match when={job.isPublished}>
                    <Dropdown menu={{ items, onClick: handleMenuClick }}>
                      <div className="flex items-center px-2 py-1 space-x-1 font-medium rounded-md cursor-pointer bg-success-50 text-success-600">
                        <RxDotFilled /> <span>Published</span> <HiChevronDown />
                      </div>
                    </Dropdown>
                  </Switch.Match>

                  <Switch.Match when={!job.isPublished}>
                    <Dropdown menu={{ items, onClick: handleMenuClick }}>
                      <div className="flex items-center px-2 py-1 space-x-1 font-medium text-gray-700 bg-gray-100 rounded-md cursor-pointer">
                        <RxDotFilled /> <span>Draft</span> <HiChevronDown />
                      </div>
                    </Dropdown>
                  </Switch.Match>
                </Switch>

                <div className="flex-1" />

                <div className="flex items-center px-2 py-1 border rounded-md shadow">
                  <p>
                    <span className="mr-2 text-xs text-gray-600">
                      In Pipeline
                    </span>
                    <span className="font-semibold">
                      {candidatesInPipeline}
                    </span>
                  </p>
                  <Divider type="vertical" />
                  <RejectCandidateIcon className="mr-2" />
                  <span className="font-semibold text-gray-600">
                    {rejectedCandidates}
                  </span>
                </div>

                <ImportTalent title={data?.title} />
              </div>

              <div className="flex items-center mb-2 space-x-2">
                <p className="text-xl font-semibold">{job.title}</p>
                <button
                  onClick={handleStarChange}
                  className="p-1 text-lg bg-transparent border rounded-md"
                >
                  <Show
                    when={isJobStarred}
                    fallback={
                      <HiOutlineStar
                        strokeWidth="1"
                        className="text-gray-500"
                      />
                    }
                  >
                    <HiStar className="text-yellow-500" strokeWidth={1} />
                  </Show>
                </button>
              </div>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <BriefcaseIcon />
                  <span>{job.experience}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <RupeeIcon />
                  <span>
                    {formatNumber(job.minSalary ?? 0)} -{' '}
                    {formatNumber(job.maxSalary ?? 0)}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <MapPinIcon />
                  <span>{job.Location?.name}</span>
                </div>

                <div className="flex items-center space-x-1">
                  {priorityIcon}
                  <span className={`${priorityLabelColor}`}>
                    {capitalize(job.priority)}
                  </span>
                </div>

                <Popover
                  content={
                    <JobDetails
                      job={data}
                      members={members}
                      isLoading={isLoading}
                      slug={workspace?.slug}
                    />
                  }
                >
                  <Button type="text">
                    Job Details <DownOutlined />
                  </Button>
                </Popover>
              </div>
            </>
          )}
        </Switch.Match>
      </Switch>
    </div>
  )
}
