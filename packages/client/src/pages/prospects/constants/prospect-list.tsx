import dayjs from 'dayjs'
import type { ColumnsType } from 'antd/es/table'
import { message, Popconfirm, Space, Select } from 'antd'

import type { Job } from '@prisma/client'
import { Candidate } from 'types/candidate'
import { Show } from 'ui-kit'

const confirm = () => {
  message.success('Prospect Deleted')
}

const cancel = () => {
  null
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
    render: (_, record) => (
      <Space size="middle">
        <Select value="Add to job">
          {appliedFor.map(({ id, title }) => (
            <Select.Option key={id} value={id}>
              {title}
            </Select.Option>
          ))}
        </Select>
        <Popconfirm
          title="Delete this prospect"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a className="text-red-600">Delete</a>
        </Popconfirm>
        <Show when={record.resume}>
          <a
            // href={record.resume}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            Resume
          </a>
        </Show>
        <Show when={record.linkedInUrl}>
          <a
            href={record.linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            Linkedin
          </a>
        </Show>
      </Space>
    ),
  },
]
