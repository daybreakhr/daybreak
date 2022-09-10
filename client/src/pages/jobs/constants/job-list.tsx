import { Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export type Job = {
  key: string
  jobrole: string
  department: string
  location: string
  priority: 'High' | 'Medium' | 'Low'
  listedon: string
  status: 'Open' | 'Closed'
}

const priorityColors: Record<string, string> = {
  High: 'red',
  Medium: 'gold',
  Low: 'green',
  Open: 'green',
  Closed: 'red',
}

export const sampleData: Job[] = [
  {
    key: '1',
    jobrole: 'Software Engineer',
    department: 'IT',
    location: 'Bangalore',
    priority: 'High',
    listedon: '14 Apr 2021, 8:43 PM',
    status: 'Closed',
  },
  {
    key: '2',
    jobrole: 'Firmware Engineer',
    department: 'IT',
    location: 'Gurgaon',
    priority: 'Medium',
    listedon: '16 Sep 2021, 5:20 PM',
    status: 'Open',
  },
  {
    key: '3',
    jobrole: 'Network Engineer',
    department: 'Network',
    location: 'Chennai',
    priority: 'Low',
    listedon: '14 Oct 2021, 10:20 AM',
    status: 'Open',
  },
]

export const jobColumns: ColumnsType<Job> = [
  {
    title: 'Job Role',
    dataIndex: 'jobrole',
    key: 'jobrole',
    render: (_, { jobrole, location }) => (
      <div className="flex flex-col">
        <span className="font-medium">{jobrole}</span>
        <span className="text-gray-500">{location}</span>
      </div>
    ),
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    filters: [
      { text: 'IT', value: 'it' },
      { text: 'Network', value: 'network' },
    ],
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: string) => (
      <Tag color={priorityColors[priority]}>{priority}</Tag>
    ),
    filters: [
      { text: 'Low', value: 'low' },
      { text: 'Medium', value: 'medium' },
      { text: 'High', value: 'high' },
    ],
  },
  { title: 'Listed On', dataIndex: 'listedon', key: 'listedon' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={priorityColors[status]}>{status}</Tag>
    ),
    filters: [
      { text: 'Open', value: 'open' },
      { text: 'Closed', value: 'closed' },
      { text: 'Offer Rolled Out', value: 'offerRolledOut' },
      { text: 'On Hold', value: 'onHold' },
    ],
  },
]
