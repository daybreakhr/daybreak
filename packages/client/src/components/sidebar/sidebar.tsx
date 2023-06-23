import { useState } from 'react'
import clsx from 'clsx'
import { Avatar, Popover } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { LogoutOutlined } from '@ant-design/icons'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'

import { Show } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import Integrations from 'components/integrations'
import { ReactComponent as BreifcaseIcon } from 'assets/icons/briefcase.svg'
import { ReactComponent as IntegrationsIcon } from 'assets/icons/integrations.svg'

import tabs from './tabs-list'
import { fetchFavoriteJobs } from './queries'

export default function Sidebar() {
  const { member } = useAuth()
  const navigate = useNavigate()
  const { jobId = '' } = useParams()
  const { signOut, user } = useAuth()
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false)

  const { data } = useQuery(['favorite-jobs'], fetchFavoriteJobs)

  const getIsActive = (isActive: boolean) =>
    isActive && !isIntegrationsOpen && !data?.find(({ id }) => id === jobId)

  return (
    <div className="flex flex-col w-56 py-4 text-white bg-gray-900 border-r">
      <Link to="/dashboard" className="flex items-center px-4 mb-5 space-x-2">
        <Avatar shape="square" size="small" src={member?.Workspace?.logo}>
          {member?.Workspace?.name?.charAt(0)}
        </Avatar>
        <p className="font-semibold">{member?.Workspace?.name}</p>
      </Link>

      {tabs.map(({ key, label, icon, children }) => (
        <>
          <NavLink
            to={key}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-2 px-4 py-1',
                getIsActive(isActive) ? 'bg-primary-500' : 'hover:bg-gray-800',
              )
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
                  'flex items-center gap-2 pl-10 pr-4',
                  isActive && !isIntegrationsOpen
                    ? 'bg-primary-500'
                    : 'hover:bg-gray-800',
                )
              }
            >
              <span className="py-1 pl-2 border-l border-gray-400">
                {label}
              </span>
            </NavLink>
          ))}
        </>
      ))}

      <div className="mt-5">
        <Show when={data && data?.length > 0}>
          <p className="px-4 py-1 font-medium text-gray-300 uppercase text-xxs">
            Favorite Jobs
          </p>
          {data?.map(({ id, title }) => (
            <NavLink
              key={id}
              to={`/jobs/${id}`}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-1 px-4 py-1',
                  isActive && !isIntegrationsOpen
                    ? 'bg-primary-500'
                    : 'hover:bg-gray-800',
                )
              }
            >
              <BreifcaseIcon className="flex-none" />
              <span className="truncate" title={title ?? ''}>
                {title}
              </span>
            </NavLink>
          ))}
        </Show>
      </div>

      <div className="flex-1" />

      <div
        className={clsx(
          'flex items-center gap-2 px-4 py-1 cursor-pointer hover:bg-primary-500',
          isIntegrationsOpen ? 'bg-primary-500' : 'hover:bg-gray-800',
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
