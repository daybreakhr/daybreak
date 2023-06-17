import { capitalize, range } from 'lodash'
import { RxDotFilled } from 'react-icons/rx'
import { HiChevronDown } from 'react-icons/hi'
import { DownOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { Candidate, CandidateStatus } from '@prisma/client'
import { Button, Divider, Dropdown, MenuProps, Popover } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Switch } from 'ui-kit'
import formatNumber from 'utils/format-number'
import { fetchMembers } from 'pages/members/queries'
import { updateJobById } from 'pages/create-job/queries'
import { fetchOrganisation } from 'pages/organisation/queries'
import { ReactComponent as RupeeIcon } from 'assets/icons/rupee.svg'
import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg'
import { ReactComponent as MapPinIcon } from 'assets/icons/map-pin.svg'
import { ReactComponent as BriefcaseIcon } from 'assets/icons/briefcase.svg'
import { ReactComponent as FileImportIcon } from 'assets/icons/file-import.svg'
import { ReactComponent as UserArrowDown } from 'assets/icons/user-arrow-down.svg'
import { ReactComponent as RejectCandidateIcon } from 'assets/icons/reject-candidate.svg'

import { fetchJob } from '../queries'
import { jobPriorityInfo } from '../constants/icons'
import JobDetails from './job-details'

type JobHeaderProps = {
  candidates: Candidate[]
}

export default function JobHeader({ candidates }: JobHeaderProps) {
  const navigate = useNavigate()
  const { jobId = '' } = useParams()

  const { data: members } = useQuery(['members'], fetchMembers)
  const { data: workspace } = useQuery(['organisation'], fetchOrganisation)
  const { data, isLoading } = useQuery(['job', jobId], () => fetchJob(jobId))

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

  const importCandidateItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Import Resumes',
      icon: <FileImportIcon />,
      disabled: true,
    },
    { key: '2', label: 'Add Manually', icon: <PencilIcon /> },
  ]

  const handleImportClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '2') {
      navigate('/candidates/create')
    }
  }

  const { icon: priorityIcon, labelColor: priorityLabelColor } =
    jobPriorityInfo(data?.priority || '')

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

                <Dropdown
                  menu={{
                    items: importCandidateItems,
                    onClick: handleImportClick,
                  }}
                >
                  <div className="flex items-center px-2 py-1 space-x-2 border rounded-md shadow cursor-pointer">
                    <UserArrowDown className="text-primary-500" />
                    <span>Import Talent</span> <DownOutlined />
                  </div>
                </Dropdown>
              </div>
              <p className="mb-2 text-xl font-semibold">{job.title}</p>
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
