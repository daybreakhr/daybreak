import { Link } from 'react-router-dom'
import { Button, Card, Table } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { Job } from 'types/job'
import { useMemo } from 'react'
import { groupBy } from 'lodash'
import { jobsList } from '../constants/jobs-list'

type JobsTableProps = {
  isLoading: boolean
  data: Job[] | undefined
}

export default function JobsTable({ isLoading, data }: JobsTableProps) {
  const jobsByPriority = useMemo(() => {
    if (data) {
      const sortedJobs = [...data]
        .filter(({ isPublished }) => isPublished)
        .sort(
          (a, b) =>
            new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
        )
      const {
        high = [],
        medium = [],
        low = [],
      } = groupBy(sortedJobs, (j) => j.priority)

      return [...high, ...medium, ...low].slice(0, 5)
    } else {
      return []
    }
  }, [data])

  return (
    <Card className="col-span-2">
      <div className="flex items-center justify-between mb-6">
        <p className="text-black/[0.45]">High Priority Jobs</p>
        <Link to="/jobs">
          <Button type="link" size="small">
            <span>View All</span>
            <RightOutlined />
          </Button>
        </Link>
      </div>

      <Table
        pagination={false}
        loading={isLoading}
        columns={jobsList}
        rowKey={(row) => row.id}
        dataSource={jobsByPriority}
      />
    </Card>
  )
}
