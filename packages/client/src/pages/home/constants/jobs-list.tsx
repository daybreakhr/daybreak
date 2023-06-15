import { Tag } from 'antd'
import { capitalize } from 'lodash'
import { Priority } from '@prisma/client'
import type { ColumnsType } from 'antd/es/table'
import { Job } from 'types/job'

export const jobsList: ColumnsType<Job> = [
  {
    title: 'Job Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Department',
    dataIndex: 'Department',
    key: 'Department',
    render: ({ name }) => name,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: Priority) => <Tag>{capitalize(priority)}</Tag>,
  },
]
