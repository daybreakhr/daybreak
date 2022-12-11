import { Avatar } from 'antd'
import { capitalize } from 'lodash'
import type { ColumnsType } from 'antd/es/table'
import { Show } from 'ui-kit'
import { MemberTableData } from 'types/member'
import UserActions from './components/user-actions'

export const columns: ColumnsType<MemberTableData> = [
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
    render: (_, { role, uid }) => (
      <span>
        {capitalize(role)}
        <Show when={!uid}>
          <span className="px-2 ml-2 text-gray-500 bg-gray-100 rounded-sm">
            {'Pending'}
          </span>
        </Show>
      </span>
    ),
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, { uid }) => <UserActions uid={uid} />,
  },
]
