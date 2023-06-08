import { Divider } from 'antd'
import { capitalize, range } from 'lodash'
import { useParams } from 'react-router-dom'
import { RxDotFilled } from 'react-icons/rx'
import { HiChevronDown } from 'react-icons/hi'
import { useQuery } from '@tanstack/react-query'
import { Candidate, CandidateStatus } from '@prisma/client'

import { Switch } from 'ui-kit'
import formatNumber from 'utils/format-number'
import { ReactComponent as RejectCandidateIcon } from 'assets/icons/reject-candidate.svg'

import { fetchJob } from '../queries'

type JobHeaderProps = {
  candidates: Candidate[]
}

export default function JobHeader({ candidates }: JobHeaderProps) {
  const { jobId = '' } = useParams()

  const { data, isLoading } = useQuery(['job', jobId], () => fetchJob(jobId))

  const rejectedCandidates = candidates.filter(
    ({ status }) => status === CandidateStatus.rejected,
  ).length

  const candidatesInPipeline = candidates.filter(
    ({ status }) => status !== CandidateStatus.rejected,
  ).length

  return (
    <div className="px-6 py-4 mb-4 bg-white shadow-lg">
      <Switch>
        <Switch.Match when={isLoading}>
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
              <div className="flex items-center mb-2">
                <Switch>
                  <Switch.Match when={job.isPublished}>
                    <div className="flex items-center px-2 py-1 space-x-1 rounded-md cursor-pointer bg-success-50 text-success-600">
                      <RxDotFilled /> <span>Published</span> <HiChevronDown />
                    </div>
                  </Switch.Match>
                </Switch>

                <div className="flex-1" />

                <div className="flex items-center px-2 py-1 border rounded-md">
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
              </div>
              <p className="mb-2 text-xl font-semibold">{job.title}</p>
              <div className="space-x-4 text-gray-600">
                <span>{job.experience}</span>
                <span>
                  {formatNumber(job.minSalary ?? 0)} -{' '}
                  {formatNumber(job.maxSalary ?? 0)}
                </span>
                <span>{job.Location?.name}</span>
                <span>{capitalize(job.priority)}</span>
              </div>
            </>
          )}
        </Switch.Match>
      </Switch>
    </div>
  )
}
