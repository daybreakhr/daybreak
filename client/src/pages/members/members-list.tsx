import { Avatar, Typography } from 'antd'
import { capitalize } from 'lodash'
import type { ColumnsType } from 'antd/es/table'
import { Member } from 'types/member'

export const columns: ColumnsType<Member> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, { displayName, email, photoURL }) => (
      <div className="flex items-center space-x-3">
        <Avatar src={photoURL}>{displayName?.charAt(0)}</Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{displayName}</span>
          <span className="text-gray-500">{email}</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (role: string) => capitalize(role),
  },
  { title: '', render: () => <Typography.Link>Edit</Typography.Link> },
]
