import dayjs from 'dayjs'
import { Tag } from 'antd'
import { capitalize } from 'lodash'
import type { ColumnsType } from 'antd/es/table'
import type { CandidateStatus, Job } from '@prisma/client'
import { Candidate } from 'types/candidate'

export const statusColor: Record<CandidateStatus, string> = {
  applied: 'cyan',
  interview: 'blue',
  offered: 'gold',
  accepted: 'green',
  rejected: 'red',
}

export const candidateColumns = (appliedFor: Job[]): ColumnsType<Candidate> => [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_, record) =>
      `${record.firstName} ${record.middleName ?? ''} ${record.lastName}`,
  },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Applied For',
    dataIndex: 'Job',
    key: 'Job',
    render: ({ title }) => title,
    filters: appliedFor.map(({ id, title }) => ({ value: id, text: title })),
    onFilter: (value, record) => record.Job?.id === value,
  },
  {
    title: 'Application Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Date) => dayjs(date).format('DD-MM-YYYY'),
    sorter: (a, b) =>
      new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(),
    defaultSortOrder: 'descend',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: CandidateStatus) => (
      <Tag color={statusColor[status]}>{capitalize(status)}</Tag>
    ),
    filters: [
      { text: 'Applied', value: 'applied' },
      { text: 'interview', value: 'interview' },
      { text: 'Offered', value: 'offered' },
      { text: 'Accepted', value: 'accepted' },
      { text: 'Rejected', value: 'rejected' },
    ],
    onFilter: (value, record) => record.status === value,
  },
]
