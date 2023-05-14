import { useEffect, useMemo, useState } from 'react'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { Flags, getFlagValue } from 'utils/remote-config'
import tabList from './tabs-list'

export default function Sidebar() {
  const { pathname } = useLocation()
  let tabs = tabList

  const emailTemplatesFlag = getFlagValue(Flags.emailTemplates).asBoolean()

  if (emailTemplatesFlag) {
    const newTab = {
      key: 'settings/email-templates',
      label: <Link to="/settings/email-templates">Email Templates</Link>,
    }

    tabs = [
      ...tabs.slice(0, 3),
      {
        ...tabs[3],
        children: tabs[3].children ? [...tabs[3].children, newTab] : [newTab],
      },
    ]
  }

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
    [tabs],
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
