import { useState } from 'react'
import clsx from 'clsx'
import { Avatar, Popover } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import useAuth from 'hooks/use-auth'
import Integrations from 'components/integrations'
import { ReactComponent as IntegrationsIcon } from 'assets/icons/integrations.svg'

import tabs from './tabs-list'

export default function Sidebar() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false)

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

      <div
        className={clsx(
          'flex items-center gap-2 px-4 py-1 cursor-pointer hover:bg-primary-500',
          { 'bg-primary-500': isIntegrationsOpen },
        )}
        onClick={() => setIsIntegrationsOpen(true)}
      >
        <IntegrationsIcon />
        Integrations
      </div>

      <Popover
        arrow={false}
        placement="right"
        overlayInnerStyle={{ padding: 0, overflow: 'hidden' }}
        content={
          <div
            onClick={() => signOut().then(() => navigate('/'))}
            className="flex items-center justify-center py-2 space-x-2 rounded-md cursor-pointer w-28 hover:bg-gray-50"
          >
            <LogoutOutlined /> <span>Logout</span>
          </div>
        }
      >
        <div className="flex items-center px-4 py-1 space-x-2 rounded-md cursor-pointer">
          <Avatar size="small" src={user?.photoURL}>
            {user?.displayName?.charAt(0)}
          </Avatar>
          <div>
            <p className="text-sm">{user?.displayName}</p>
          </div>
        </div>
      </Popover>

      <Integrations
        isOpen={isIntegrationsOpen}
        onClose={() => setIsIntegrationsOpen(false)}
      />
    </div>
  )
}
