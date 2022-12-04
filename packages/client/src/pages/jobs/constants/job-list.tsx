import dayjs from 'dayjs'
import { capitalize } from 'lodash'
import { Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Department, Priority } from '@prisma/client'
import { Job } from 'types/job'

export const priorityColor: Record<Priority, string> = {
  high: 'red',
  medium: 'gold',
  low: 'green',
}

export const jobColumns = (
  uniqueDepartments: Department[],
): ColumnsType<Job> => [
  {
    title: 'Job Title',
    dataIndex: 'title',
    key: 'title',
    render: (_, row) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.title}</span>
        <span className="text-gray-500">{row.Location?.name}</span>
      </div>
    ),
  },
  {
    title: 'Department',
    dataIndex: 'Department',
    key: 'Department',
    render: ({ name }) => name,
    filters: uniqueDepartments.map(({ id, name }) => ({
      value: id,
      text: name,
    })),
    onFilter: (value, record) => record.Department?.id === value,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: Priority) => (
      <Tag color={priorityColor[priority]}>{capitalize(priority)}</Tag>
    ),
    filters: [
      { text: 'High', value: 'high' },
      { text: 'Medium', value: 'medium' },
      { text: 'Low', value: 'low' },
    ],
    onFilter: (value, record) => record.priority === value,
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Date) => dayjs(date).format('DD-MM-YYYY'),
    sorter: (a, b) =>
      new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(),
    defaultSortOrder: 'descend',
  },
  {
    title: 'Status',
    dataIndex: 'isPublished',
    key: 'status',
    render: (status: boolean) => (
      <Tag color={status ? 'green' : 'red'}>
        {status ? 'Published' : 'Draft'}
      </Tag>
    ),
    filters: [
      { text: 'Published', value: true },
      { text: 'Draft', value: false },
    ],
    onFilter: (value, record) => record.isPublished === value,
  },
]
