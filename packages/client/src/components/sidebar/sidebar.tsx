import { useEffect, useMemo, useState } from 'react'
import { Layout, Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import tabs from './tabs-list'

export default function Sidebar() {
  const { pathname } = useLocation()

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
    <Layout.Sider className="h-full" theme="light" trigger={null}>
      <Menu
        items={tabs}
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={selectedKeys}
        onSelect={handleSelectItem}
      />
    </Layout.Sider>
  )
}
