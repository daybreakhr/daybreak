import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd'
import {
  AiOutlineLogout,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from 'react-icons/ai'
import useAuth from 'hooks/use-auth'
import tabs from './tabs-list'

export default function AppShell() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { signOut, user } = useAuth()

  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([pathname.split('/')[1]])

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

  function handleSelectItem({ key }: { key: string }) {
    setSelectedKeys([key])
    navigate(`/${key}`)
  }

  return (
    <div className="w-screen h-screen flex">
      <Layout.Sider
        className="h-full"
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Menu
          items={tabs}
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={handleSelectItem}
        />
      </Layout.Sider>

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

        <div className="bg-gray-100 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
