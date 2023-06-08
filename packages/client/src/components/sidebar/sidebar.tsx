import { useEffect, useMemo, useState } from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, MenuProps } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from 'hooks/use-auth'
import tabs from './tabs-list'

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { signOut, user } = useAuth()

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: () => signOut().then(() => navigate('/')),
    },
  ]

  const allKeys = useMemo(
    () =>
      tabs
        .map(({ key, children }) => {
          const keys: string[] = [key]
          if (children) {
            children.forEach(({ key }) => {
              keys.push(key)
            })
          }
          return keys
        })
        .flat(),
    [],
  )

  const [selectedKeys, setSelectedKeys] = useState(
    allKeys.filter((key) => pathname.includes(key)),
  )

  useEffect(() => {
    setSelectedKeys(allKeys.filter((key) => pathname.includes(key)))
  }, [pathname, allKeys])

  function handleSelectItem({ key }: { key: string }) {
    setSelectedKeys([key])
  }

  return (
    <div className="flex flex-col w-56 py-4 border-r">
      <Link to="/home">
        <img
          src="/assets/logo_large.svg"
          className="flex items-center w-40 pl-6 mb-4"
        />
      </Link>

      <Menu
        items={tabs}
        mode="inline"
        style={{ borderRight: 0 }}
        selectedKeys={selectedKeys}
        defaultOpenKeys={selectedKeys}
        onSelect={handleSelectItem}
      />

      <div className="flex-1" />

      <Dropdown menu={{ items }} placement="topRight">
        <div className="flex items-center px-4 py-1 space-x-2 rounded-md cursor-pointer">
          <Avatar size="small" src={user?.photoURL}>
            {user?.displayName?.charAt(0)}
          </Avatar>
          <div>
            <p className="text-sm">{user?.displayName}</p>
          </div>
        </div>
      </Dropdown>
    </div>
  )
}
