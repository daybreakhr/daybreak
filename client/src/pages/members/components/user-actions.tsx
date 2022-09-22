import { Dropdown, Menu } from 'antd'
import {
  AiOutlineDelete,
  AiOutlineMore,
  AiOutlineSetting,
} from 'react-icons/ai'
import useAuth from 'hooks/use-auth'

type UserActionsProps = {
  uid?: string
}

export default function UserActions({ uid }: UserActionsProps) {
  const { user } = useAuth()

  const overlay =
    user?.role === 'admin' ? (
      <Menu>
        <Menu.Item key="change_role" icon={<AiOutlineSetting />}>
          Change Role
        </Menu.Item>
        <Menu.Item
          key="remove_user"
          icon={<AiOutlineDelete className="text-red-500" />}
        >
          <span className="text-red-500">Remove User</span>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu>
        <Menu.Item
          key="leave_workspace"
          icon={<AiOutlineDelete className="text-red-500" />}
        >
          <span className="text-red-500">Leave Workspace</span>
        </Menu.Item>
      </Menu>
    )

  if (user?.role === 'admin' && uid !== user.uid) {
    return (
      <Dropdown trigger={['click']} overlay={overlay}>
        <button className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded-full">
          <AiOutlineMore />
        </button>
      </Dropdown>
    )
  } else if (user?.role === 'member' && uid === user.uid) {
    return (
      <Dropdown trigger={['click']} overlay={overlay}>
        <button className="flex items-center justify-center w-6 h-6 hover:bg-gray-200 rounded-full">
          <AiOutlineMore />
        </button>
      </Dropdown>
    )
  }

  return null
}
