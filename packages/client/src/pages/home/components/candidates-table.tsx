import { Link } from 'react-router-dom'
import { Button, Card, Table } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { Candidate } from 'types/candidate'
import { candidatesList } from '../constants/candidates-list'

type CandidatesTableProps = {
  isLoading: boolean
  data: Candidate[] | undefined
}

export default function CandidatesTable({
  isLoading,
  data,
}: CandidatesTableProps) {
  const sortedCandidates = [...(data ?? [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
    )
    .slice(0, 5)

  return (
    <Card className="col-span-2">
      <div className="flex items-center justify-between mb-6">
        <p className="text-black/[0.45]">Recent Candidates</p>
        <Link to="/candidates">
          <Button type="link" size="small">
            <span>View All</span>
            <RightOutlined />
          </Button>
        </Link>
      </div>

      <Table
        pagination={false}
        loading={isLoading}
        rowKey={(row) => row.id}
        columns={candidatesList}
        dataSource={sortedCandidates}
      />
    </Card>
  )
}
