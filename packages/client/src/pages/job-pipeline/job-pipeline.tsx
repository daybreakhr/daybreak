import { groupBy } from 'lodash'
import { useParams } from 'react-router-dom'
import { CandidateStatus } from '@prisma/client'
import { useQueries } from '@tanstack/react-query'

import { fetchInterviews } from 'pages/create-pipeline/queries'

import StatusList from './components/status-list'
import { fetchCandidatesByJob } from './queries'

export default function JobPipeline() {
  const { jobId = '' } = useParams()

  const [
    { data: candidates = [], isLoading: isCandidatesLoading },
    { data: interviews = [], isLoading: isInterviewsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['candidates', jobId],
        queryFn: () => fetchCandidatesByJob(jobId),
      },
      {
        queryKey: ['interviews', jobId],
        queryFn: () => fetchInterviews(jobId),
      },
    ],
  })

  const groupByStatus = groupBy(candidates, (candidate) => candidate.status)

  const groupByInterview = groupBy(
    candidates,
    (candidate) => candidate.interviewId,
  )

  return (
    <div className="flex flex-1 gap-3 px-6 pt-4 overflow-x-auto">
      <StatusList
        title="Sourced"
        isLoading={isCandidatesLoading}
        className="border-t-amber-500"
        candidates={groupByStatus[CandidateStatus.sourced]}
      />
      <StatusList
        title="Applied"
        isLoading={isCandidatesLoading}
        className="border-t-amber-500"
        candidates={groupByStatus[CandidateStatus.applied]}
      />
      {interviews.map(({ id, title }) => (
        <StatusList
          key={id}
          title={title}
          isLoading={isInterviewsLoading}
          className="border-t-lime-500"
          candidates={groupByInterview[id]}
        />
      ))}
      <StatusList
        title="Offer Extended"
        isLoading={isCandidatesLoading}
        className="border-t-indigo-500"
        candidates={groupByStatus[CandidateStatus.offered]}
      />
      <StatusList
        title="Accepted"
        isLoading={isCandidatesLoading}
        className="border-t-green-500"
        candidates={groupByStatus[CandidateStatus.accepted]}
      />
      <StatusList
        title="Rejected"
        isLoading={isCandidatesLoading}
        className="border-t-red-500"
        candidates={groupByStatus[CandidateStatus.rejected]}
      />
    </div>
  )
}
