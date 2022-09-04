import { createElement, useState } from 'react'
import useAuth from 'hooks/use-auth'
import { Avatar, Layout, Menu, Popover } from 'antd'
import {
  AiOutlineWallet,
  AiOutlineTeam,
  AiOutlineSetting,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
} from 'react-icons/ai'
import { Header } from 'antd/lib/layout/layout'

export default function Home() {
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="w-screen h-screen flex">
      <Layout.Sider
        className="h-full border-r"
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <p>Daybreak</p>
        <Menu mode="inline">
          <Menu.Item key="1" icon={<AiOutlineTeam />}>
            Candidate
          </Menu.Item>
          <Menu.Item key="2" icon={<AiOutlineWallet />}>
            Job Management
          </Menu.Item>
          <Menu.Item key="3" icon={<AiOutlineSetting />}>
            Team Management
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <div className="flex-1">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="inline-block">
            {createElement(
              collapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold,
              {
                className: 'flex text-white text-4xl pt-3 justify-items-center',
                onClick: () => setCollapsed(!collapsed),
              },
            )}
          </div>
          <div className="float-right mr-10">
            <Popover
              placement="bottom"
              content={<a>Log Out</a>}
              trigger="click"
            >
              {typeof user?.photoURL === 'undefined' ? (
                <Avatar
                  size="large"
                  style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                >
                  {user?.displayName?.charAt(0)}
                </Avatar>
              ) : (
                <Avatar size="large" src={user?.photoURL} />
              )}
            </Popover>
          </div>
        </Header>
      </div>
    </div>
  )
}
