import { Avatar, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'

export type Member = {
  key: string
  name: string
  email: string
  photoURL?: string | null
  role: 'Admin' | 'Member'
}

export const sampleData: Member[] = [
  {
    key: '1',
    name: 'Jimmy Brown',
    email: 'jimmy.brown@example.com',
    role: 'Admin',
  },
  {
    key: '2',
    name: 'Shawn Green',
    email: 'shawn.green@example.com',
    role: 'Admin',
  },
  {
    key: '3',
    name: 'Cobe Red',
    email: 'cobe.red@example.com',
    role: 'Member',
  },
  {
    key: '4',
    name: 'Jill Pink',
    email: 'jill.pink@example.com',
    role: 'Member',
  },
]

export const columns: ColumnsType<Member> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { name, email, photoURL }) => (
      <div className="flex items-center space-x-3">
        <Avatar src={photoURL}>{name.charAt(0)}</Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-gray-500">{email}</span>
        </div>
      </div>
    ),
  },
  { title: 'Role', dataIndex: 'role', key: 'role' },
  { title: '', render: () => <Typography.Link>Edit</Typography.Link> },
]
