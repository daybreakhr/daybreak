import { Button, Dropdown, Space, Tooltip, message, MenuProps, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { AiFillLinkedin, AiOutlineFilePdf, AiOutlineMore } from 'react-icons/ai'
import { Show } from 'ui-kit'

export type Prospects = {
  key: string
  name: string
  email: string
  location: string
  addedOn: string
  links: {
    resume?: string
    linkedIn?: string
  }
  jobs?: string[]
}

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

export const sampleData: Prospects[] = [
  {
    key: '1',
    name: 'John Brown',
    email: 'sample@mail.com',
    location: 'New York',
    addedOn: '12/12/2020',
    links: {
      linkedIn: 'https://www.google.com',
    },
    jobs: ['Senior Developer', 'Developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    email: 'sample@mail.com',
    location: 'London',
    addedOn: '12/12/2020',
    links: {
      resume: 'https://www.google.com',
      linkedIn: 'https://www.google.com',
    },
    jobs: ['Designer', 'Product Manager'],
  },
  {
    key: '3',
    name: 'Joe Black',
    email: 'sample@mail.com',
    location: 'Sydney',
    addedOn: '12/12/2020',
    links: {
      linkedIn: 'https://www.google.com',
    },
    jobs: ['Developer', 'Designer', 'Product Manager'],
  },
]

export const mockProspectColumns = (): ColumnsType<Prospects> => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Location', dataIndex: 'location', key: 'location' },
  { title: 'Added On', dataIndex: 'addedOn', key: 'addedOn' },
  {
    title: 'Jobs',
    dataIndex: 'jobs',
    key: 'jobs',
    render: (jobs) => (
      <>
        {jobs.map((job: any) => (
          <Tag key="value">{job}</Tag>
        ))}{' '}
      </>
    ),
  },
  {
    title: 'Available Links',
    dataIndex: 'links',
    key: 'links',
    align: 'center',
    width: 150,
    render: (action: any) => (
      <Space size="middle">
        <Show when={action.resume}>
          <Tooltip title="View Resume">
            <Button
              shape="circle"
              target="_blank"
              href={action.resume ?? ''}
              icon={<AiOutlineFilePdf />}
            />
          </Tooltip>
        </Show>
        <Show when={action.linkedIn}>
          <Tooltip title="Visit LinkedIn Profile">
            <Button
              shape="circle"
              target="_blank"
              href={action.linkedIn}
              icon={<AiFillLinkedin fill="RoyalBlue" />}
            />
          </Tooltip>
        </Show>
      </Space>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    align: 'center',
    width: 100,
    render: () => (
      <>
        <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
          <Button shape="circle" target="_blank" icon={<AiOutlineMore />} />
        </Dropdown>
        {/* <Select value="Add to job">
          {appliedFor.map(({ id, title }) => (
            <Select.Option key={id} value={id}>
              {title}
            </Select.Option>
          ))}
        </Select> */}
      </>
    ),
  },
]
