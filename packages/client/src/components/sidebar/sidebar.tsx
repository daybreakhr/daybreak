import clsx from 'clsx'
import { LogoutOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, MenuProps } from 'antd'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from 'hooks/use-auth'
import tabs from './tabs-list'

export default function Sidebar() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: () => signOut().then(() => navigate('/')),
    },
  ]

  return (
    <div className="flex flex-col w-56 py-4 text-white bg-gray-900 border-r">
      <Link to="/dashboard">
        <img
          src="/assets/logo_large.svg"
          className="flex items-center w-40 py-1 pl-5 mb-3"
        />
      </Link>

      {tabs.map(({ key, label, icon, children }) => (
        <div key={key}>
          <NavLink
            to={key}
            className={({ isActive }) =>
              clsx('flex items-center gap-2 px-4 py-1 hover:bg-primary-500', {
                'bg-primary-500': isActive,
              })
            }
          >
            {icon} {label}
          </NavLink>
          {children?.map(({ key, label }) => (
            <NavLink
              key={key}
              to={key}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-2 pl-10 pr-4 hover:bg-primary-500',
                  { 'bg-primary-500': isActive },
                )
              }
            >
              <span className="py-1 pl-2 border-l border-gray-400">
                {label}
              </span>
            </NavLink>
          ))}
        </div>
      ))}

      <div className="flex-1" />

      <Dropdown menu={{ items, theme: 'dark' }} placement="topRight">
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
