import { groupBy } from 'lodash'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CandidateStatus } from '@prisma/client'
import StatusList from './components/status-list'
import { fetchCandidatesByJob } from './queries'

export default function JobPipeline() {
  const { jobId = '' } = useParams()

  const { data, isLoading } = useQuery(['candidates', jobId], () =>
    fetchCandidatesByJob(jobId),
  )
  const groupByStatus = groupBy(data ?? [], (candidate) => candidate.status)

  return (
    <div className="flex flex-1 gap-6 p-8 overflow-x-auto">
      <StatusList
        title="Applied"
        isLoading={isLoading}
        className="border-t-amber-500"
        candidates={groupByStatus[CandidateStatus.applied]}
      />
      <StatusList
        title="Interviewing"
        isLoading={isLoading}
        className="border-t-lime-500"
        candidates={groupByStatus[CandidateStatus.interview]}
      />
      <StatusList
        title="Offer Extended"
        isLoading={isLoading}
        className="border-t-indigo-500"
        candidates={groupByStatus[CandidateStatus.offered]}
      />
      <StatusList
        title="Accepted"
        isLoading={isLoading}
        className="border-t-green-500"
        candidates={groupByStatus[CandidateStatus.accepted]}
      />
      <StatusList
        title="Rejected"
        isLoading={isLoading}
        className="border-t-red-500"
        candidates={groupByStatus[CandidateStatus.rejected]}
      />
    </div>
  )
}
