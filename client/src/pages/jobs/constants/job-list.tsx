import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { AiOutlineEdit, AiOutlineMore } from 'react-icons/ai'
import { Job } from 'types/job'

export const jobColumns: ColumnsType<Job> = [
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
        overlay={
          <Menu>
            <Link to={`/jobs/${id}/create`}>
              <Menu.Item icon={<AiOutlineEdit />}>Edit Job</Menu.Item>
            </Link>
          </Menu>
        }
      >
        <button className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded-full">
          <AiOutlineMore />
        </button>
      </Dropdown>
    ),
  },
]
