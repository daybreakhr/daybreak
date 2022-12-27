import { useMemo } from 'react'
import dayjs from 'dayjs'
import { Card } from 'antd'
import { countBy } from 'lodash'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Candidate } from 'types/candidate'

type CandidatesChartProps = {
  data: Candidate[] | undefined
}

export default function CandidatesChart({ data }: CandidatesChartProps) {
  const candidatesByDate = useMemo(() => {
    const createdAt = data?.map(({ createdAt }) => createdAt.split('T')[0])
    const groupBy = countBy(createdAt, dayjs)
    return Object.entries(groupBy).map(([key, value]) => ({
      key: dayjs(key).format('DD MMM, YYYY'),
      value,
    }))
  }, [data])

  return (
    <Card className="col-span-3">
      <p className="text-black/[0.45] mb-6">Candidates Applied</p>
      <div className="h-80">
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
  )
}
