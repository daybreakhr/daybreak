import { useMemo } from 'react'
import dayjs from 'dayjs'
import { Card, Statistic } from 'antd'
import { useQueries } from '@tanstack/react-query'
import { fetchCandidates } from 'pages/candidates/queries'
import { fetchJobs } from 'pages/jobs/queries'
import CandidatesChart from './components/candidates-chart'
import CandidatesTable from './components/candidates-table'
import JobsTable from './components/jobs-table'
import {
  AiOutlineBarChart,
  AiOutlineCheckCircle,
  AiOutlineFileText,
  AiOutlineUserAdd,
} from 'react-icons/ai'

const now = dayjs()

export default function Home() {
  const [
    { data: jobs, isLoading: isJobsLoading },
    { data: candidates, isLoading: isCandidatesLoading },
  ] = useQueries({
    queries: [
      { queryKey: ['jobs'], queryFn: fetchJobs },
      { queryKey: ['candidates'], queryFn: fetchCandidates },
    ],
  })

  const count = useMemo(
    () => ({
      talentPipeline:
        candidates?.filter(
          ({ status }) => status !== 'rejected' && status !== 'accepted',
        ).length ?? 0,

      openJobs: jobs?.filter(({ isPublished }) => isPublished).length ?? 0,
      newCandidates:
        candidates?.filter(({ createdAt }) => {
          const date2 = dayjs(createdAt)
          const diff = now.diff(date2, 'day')
          return diff < 7
        }).length ?? 0,
      accepted:
        candidates?.filter(({ status }) => status === 'accepted').length ?? 0,
    }),
    [candidates, jobs],
  )

  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      <Card>
        <Statistic
          title="Talent Pipeline"
          value={count.talentPipeline}
          prefix={<AiOutlineBarChart />}
          loading={isCandidatesLoading}
        />
      </Card>

      <Card>
        <Statistic
          title="Open Jobs"
          value={count.openJobs}
          prefix={<AiOutlineFileText />}
          loading={isJobsLoading}
        />
      </Card>

      <Card>
        <Statistic
          title="New Candidates"
          value={count.newCandidates}
          prefix={<AiOutlineUserAdd />}
          loading={isCandidatesLoading}
        />
      </Card>

      <Card>
        <Statistic
          title="Offer Accepted"
          value={count.accepted}
          prefix={<AiOutlineCheckCircle />}
          valueStyle={{ color: '#3f8600' }}
          loading={isCandidatesLoading}
        />
      </Card>

      <CandidatesChart data={candidates} />
      <CandidatesTable isLoading={isCandidatesLoading} data={candidates} />
      <JobsTable isLoading={isJobsLoading} data={jobs} />
    </div>
  )
}
