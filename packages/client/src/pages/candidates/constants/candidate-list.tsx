import dayjs from 'dayjs'
import type { Job } from '@prisma/client'
import { Candidate } from 'types/candidate'
import type { ColumnsType } from 'antd/es/table'
import type { NavigateFunction } from 'react-router-dom'

export const candidateColumns = (
  navigate: NavigateFunction,
  appliedFor: Job[],
): ColumnsType<Candidate> => [
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
    filters: appliedFor.map(({ id, title }) => ({
      value: id,
      text: title,
    })),
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
]
