import clsx from 'clsx'
import dayjs from 'dayjs'
import { capitalize } from 'lodash'
import { Dropdown, Menu, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Priority, Role } from '@prisma/client'
import type { NavigateFunction } from 'react-router-dom'
import { AiOutlineEdit, AiOutlineMore } from 'react-icons/ai'
import { Job } from 'types/job'

const priorityColor: Record<Priority, string> = {
  high: 'red',
  medium: 'default',
  low: 'green',
}

export const jobColumns = (
  navigate: NavigateFunction,
  role?: Role,
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
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: Priority) => (
      <Tag color={priorityColor[priority]}>{capitalize(priority)}</Tag>
    ),
  },
  {
    title: 'Created On',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Date) => dayjs(date).format('DD-MM-YYYY'),
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
  },
  {
    title: '',
    render: (_, { id }) => (
      <Dropdown
        trigger={['click']}
        disabled={role === 'member'}
        className={clsx({ 'cursor-not-allowed': role === 'member' })}
        overlay={
          <Menu>
            <Menu.Item
              icon={<AiOutlineEdit />}
              onClick={() => navigate(`/jobs/${id}/create`)}
            >
              Edit Job
            </Menu.Item>
          </Menu>
        }
      >
        <button className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200">
          <AiOutlineMore />
        </button>
      </Dropdown>
    ),
  },
]
