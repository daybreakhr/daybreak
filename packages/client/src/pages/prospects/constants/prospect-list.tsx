import dayjs from 'dayjs'
import type { ColumnsType } from 'antd/es/table'
import type { CandidateStatus, Job } from '@prisma/client'
import { Candidate } from 'types/candidate'
import { Button, Space } from 'antd'

export const statusColor: Record<CandidateStatus, string> = {
  applied: 'cyan',
  interview: 'blue',
  offered: 'gold',
  accepted: 'green',
  rejected: 'red',
}

export const prospectColumns = (
  appliedFor: Job[],
  locationApplied: Job[],
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
    filters: appliedFor.map(({ id, title }) => ({ value: id, text: title })),
    onFilter: (value, record) => record.Job?.id === value,
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    filters: locationApplied.map(({ id, title }) => ({
      value: id,
      text: title,
    })),
  },
  {
    title: 'Added on',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Date) => dayjs(date).format('DD-MM-YYYY'),
    sorter: (a, b) =>
      new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(),
    defaultSortOrder: 'descend',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space size="middle">
        <Button type="primary">Add to Job</Button>
        <a className="text-red-600">Delete</a>
      </Space>
    ),
  },
]
