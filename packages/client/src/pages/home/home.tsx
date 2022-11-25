import { useMemo } from 'react'
import dayjs from 'dayjs'
import { countBy } from 'lodash'
import { Card, Statistic } from 'antd'
import { useQueries } from '@tanstack/react-query'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { fetchCandidates } from 'pages/candidates/queries'
import { fetchJobs } from 'pages/jobs/queries'

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

  const candidatesByDate = useMemo(() => {
    const createdAt = candidates?.map(
      ({ createdAt }) => createdAt.split('T')[0],
    )
    const groupBy = countBy(createdAt, dayjs)
    return Object.entries(groupBy).map(([key, value]) => ({
      key: dayjs(key).format('DD MMM, YYYY'),
      value,
    }))
  }, [candidates])

  return (
    <div className="grid grid-cols-4 gap-4 p-8">
      <Card>
        <Statistic
          title="Talent Pipeline"
          value={count.talentPipeline}
          loading={isCandidatesLoading}
        />
      </Card>

      <Card>
        <Statistic
          title="Open Jobs"
          value={count.openJobs}
          loading={isJobsLoading}
        />
      </Card>

      <Card>
        <Statistic
          title="New Candidates"
          value={count.newCandidates}
          loading={isCandidatesLoading}
        />
      </Card>

      <Card>
        <Statistic
          title="Offer Accepted"
          value={count.accepted}
          loading={isCandidatesLoading}
        />
      </Card>

      <Card className="col-span-4">
        <p className="text-black/[0.45] mb-6">Candidates Applied</p>
        <div className="h-[60vh]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={candidatesByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="key" />
              <YAxis />
              <Line
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
