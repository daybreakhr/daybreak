import { Avatar, Dropdown, Menu, MenuProps, message } from 'antd'
import { capitalize } from 'lodash'
import type { ColumnsType } from 'antd/es/table'
import { Member } from 'types/member'
import { AiOutlineMore } from 'react-icons/ai'

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`)
}

const menu = (props: any) => {
  return (
    <Menu>
      {props === 'Admin' ? (
        <Menu>
          <Menu.Item key="1" onClick={onClick}>
            Change Role
          </Menu.Item>
          <Menu.Item key="2" onClick={onClick} style={{ color: '#ff000f' }}>
            Remove User
          </Menu.Item>
        </Menu>
      ) : (
        <Menu.Item key="1" onClick={onClick} style={{ color: '#ff000f' }}>
          Leave Workspace
        </Menu.Item>
      )}
    </Menu>
  )
}

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
  {
    title: '',
    dataIndex: 'role',
    render: (role: string) => (
      <>
        <Dropdown trigger={['click']} overlay={menu(role)}>
          <AiOutlineMore className="cursor-pointer" />
        </Dropdown>
      </>
    ),
  },
]
