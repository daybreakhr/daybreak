import { Tag } from 'antd'
import { capitalize } from 'lodash'
import { CandidateStatus } from '@prisma/client'
import type { ColumnsType } from 'antd/es/table'
import { Candidate } from 'types/candidate'
import { statusColor } from 'pages/candidates/constants/candidate-list'

export const candidatesList: ColumnsType<Candidate> = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_, record) =>
      `${record.firstName} ${record.middleName ?? ''} ${record.lastName}`,
  },
  {
    title: 'Applied For',
    dataIndex: 'Job',
    key: 'Job',
    render: ({ title }) => title,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: CandidateStatus) => (
      <Tag color={statusColor[status]}>{capitalize(status)}</Tag>
    ),
  },
]
