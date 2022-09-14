import { Dropdown, Menu } from 'antd'
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineMore,
  AiOutlineSetting,
} from 'react-icons/ai'

export default function JobActions(status: any) {
  const overlay =
    status.status === 'Published' ? (
      <Menu>
        <Menu.Item key="remove_user" icon={<AiOutlineSetting />}>
          Edit
        </Menu.Item>
        <Menu.Item
          key="change_role"
          icon={<AiOutlineClose className="text-red-500" />}
        >
          <span className="text-red-500">Mark as Unpublished</span>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu>
        <Menu.Item key="remove_user" icon={<AiOutlineSetting />}>
          Edit
        </Menu.Item>
        <Menu.Item
          key="change_role"
          icon={<AiOutlineCheck className="text-green-600" />}
        >
          <span className="text-green-600">Mark as Published</span>
        </Menu.Item>
      </Menu>
    )

  if (status.status === 'Published') {
    return (
      <Dropdown trigger={['click']} overlay={overlay}>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <AiOutlineMore />
        </button>
      </Dropdown>
    )
  } else if (status.status === 'Unpublished') {
    return (
      <Dropdown trigger={['click']} overlay={overlay}>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <AiOutlineMore />
        </button>
      </Dropdown>
    )
  }

  return null
}
