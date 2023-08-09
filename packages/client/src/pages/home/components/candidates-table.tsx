import { Card, Table } from 'antd'
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
      <p className="mb-6 text-gray-500">Recent Candidates</p>

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
