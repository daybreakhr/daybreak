import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import tabs from './tabs-list'

export default function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [selectedKeys, setSelectedKeys] = useState([pathname.split('/')[1]])

  function handleSelectItem({ key }: { key: string }) {
    setSelectedKeys([key])
    navigate(`/${key}`)
  }

  return (
    <Layout.Sider className="h-full" theme="light" trigger={null}>
      <Menu
        items={tabs}
        mode="inline"
        selectedKeys={selectedKeys}
        onSelect={handleSelectItem}
      />
    </Layout.Sider>
  )
}
