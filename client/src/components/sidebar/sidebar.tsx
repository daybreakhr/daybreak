import { useState } from 'react'
import clsx from 'clsx'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import tabs from './tabs-list'

type SidebarProps = {
  collapsed: boolean
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [selectedKeys, setSelectedKeys] = useState([pathname.split('/')[1]])

  function handleSelectItem({ key }: { key: string }) {
    setSelectedKeys([key])
    navigate(`/${key}`)
  }

  return (
    <Layout.Sider
      className="h-full"
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div
        className={clsx(
          'flex items-center space-x-2',
          collapsed ? 'px-6 py-4' : 'p-4',
        )}
      >
        <div className="flex items-center justify-center bg-gray-600 text-white w-8 h-8 rounded-lg flex-shrink-0">
          <span>D</span>
        </div>

        <span
          className={clsx('mb-0 font-sans font-medium text-gray-700', {
            hidden: collapsed,
          })}
        >
          Daybreak
        </span>
      </div>

      <Menu
        items={tabs}
        mode="inline"
        selectedKeys={selectedKeys}
        onSelect={handleSelectItem}
      />
    </Layout.Sider>
  )
}
