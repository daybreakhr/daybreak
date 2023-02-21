import dayjs from 'dayjs'
import type { Job } from '@prisma/client'
import type { ColumnsType } from 'antd/es/table'
import { message, Tooltip, Button, Dropdown, MenuProps, Tag } from 'antd'
import { AiFillLinkedin, AiOutlineFilePdf, AiOutlineMore } from 'react-icons/ai'
import { Show } from 'ui-kit'
import type { Prospect } from 'types/prospect'

const confirm = () => {
  message.success('Prospect Deleted')
}

const items: MenuProps['items'] = [
  {
    label: 'Add to job',
    key: 'add-to-job',
  },
  {
    label: 'Delete',
    key: 'delete',
    danger: true,
    onClick: confirm,
  },
]

export const prospectColumns = (
  appliedFor: Job[],
  locationApplied: Job[],
): ColumnsType<Prospect> => [
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
    title: 'Applied For',
    dataIndex: 'Job',
    key: 'Job',
    render: (row: Prospect) =>
      row?.Jobs.map(({ title, id }) => <Tag key={id}>{title}</Tag>),
    filters: appliedFor.map(({ id, title }) => ({ value: id, text: title })),
    onFilter: (value, record) => record.Jobs.some((job) => job.id === value),
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
    title: 'Available Links',
    key: 'links',
    width: 150,
    render: (_, record) => (
      <div className="space-x-3">
        <Show when={record.resume}>
          <Tooltip title="View Resume">
            <Button
              shape="circle"
              target="_blank"
              href={record?.resume ?? ''}
              icon={<AiOutlineFilePdf />}
            />
          </Tooltip>
        </Show>
        <Show when={record.linkedInUrl}>
          <Tooltip title="Visit LinkedIn Profile">
            <Button
              shape="circle"
              target="_blank"
              href={record?.linkedInUrl}
              icon={<AiFillLinkedin fill="RoyalBlue" />}
            />
          </Tooltip>
        </Show>
      </div>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    align: 'center',
    width: 100,
    render: () => (
      <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
        <Button shape="circle" target="_blank" icon={<AiOutlineMore />} />
      </Dropdown>
    ),
  },
]
