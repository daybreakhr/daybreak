import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Avatar, Button, Dropdown, Menu } from 'antd'
import {
  AiOutlineLogout,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from 'react-icons/ai'
import useAuth from 'hooks/use-auth'
import Sidebar from 'components/sidebar'

export default function AppShell() {
  const { signOut, user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const menu = (
    <Menu>
      <div className="p-2 border-b">
        <p className="mb-0 text-xs text-gray-700">Signed-in as</p>
        <p className="mb-0">{user?.displayName}</p>
      </div>
      <Menu.Item onClick={signOut} icon={<AiOutlineLogout />}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="w-screen h-screen flex">
      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col">
        <header className="flex py-3 border-b items-center justify-between px-6">
          <Button
            type="text"
            onClick={() => setCollapsed((prevState) => !prevState)}
          >
            {collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          </Button>
          <Dropdown overlay={menu}>
            <Avatar src={user?.photoURL}>{user?.displayName?.charAt(0)}</Avatar>
          </Dropdown>
        </header>

        <div className="bg-gray-100 flex-1 overflow-y-auto flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
