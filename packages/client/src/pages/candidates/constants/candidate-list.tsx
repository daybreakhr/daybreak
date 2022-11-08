import dayjs from 'dayjs'
import type { Job } from '@prisma/client'
import { Candidate } from 'types/candidate'
import type { ColumnsType } from 'antd/es/table'

export const candidateColumns: ColumnsType<Candidate> = [
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
    render: (value: Job) => value.title,
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
