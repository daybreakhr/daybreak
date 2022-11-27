import clsx from 'clsx'
import dayjs from 'dayjs'
import { capitalize } from 'lodash'
import { Dropdown, Menu, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { NavigateFunction } from 'react-router-dom'
import type { Department, Priority, Role } from '@prisma/client'
import { AiOutlineEdit, AiOutlineEye, AiOutlineMore } from 'react-icons/ai'
import { Job } from 'types/job'

export const priorityColor: Record<Priority, string> = {
  high: 'red',
  medium: 'default',
  low: 'green',
}

export const jobColumns = (
  navigate: NavigateFunction,
  uniqueDepartments: Department[],
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
  {
    title: '',
    render: (_, { id }) => (
      <Dropdown
        trigger={['click']}
        placement="bottomRight"
        disabled={role === 'member'}
        className={clsx({ 'cursor-not-allowed': role === 'member' })}
        overlay={
          <Menu>
            <Menu.Item
              icon={<AiOutlineEye />}
              onClick={() => navigate(`/jobs/${id}`)}
            >
              Preview
            </Menu.Item>
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
