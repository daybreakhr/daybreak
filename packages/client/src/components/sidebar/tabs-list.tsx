import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as HomeIcon } from 'assets/icons/home.svg'
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg'
import { ReactComponent as BreifcaseIcon } from 'assets/icons/briefcase.svg'

type Tab = {
  key: string
  label: ReactNode
  icon: ReactNode
  children?: {
    key: string
    label: ReactNode
  }[]
}

const tabs: Tab[] = [
  {
    key: 'dashboard',
    label: <Link to="/dashboard">Dashboard</Link>,
    icon: <HomeIcon />,
  },
  {
    key: 'jobs',
    label: <Link to="/jobs">All Jobs</Link>,
    icon: <BreifcaseIcon />,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    children: [
      {
        key: 'settings/organisation',
        label: <Link to="/settings/organisation">Organisation</Link>,
      },
      {
        key: 'settings/members',
        label: <Link to="/settings/members">Members</Link>,
      },
      {
        key: 'settings/integrations',
        label: <Link to="/settings/integrations">Integrations</Link>,
      },
      {
        key: 'settings/email-templates',
        label: <Link to="/settings/email-templates">Email Templates</Link>,
      },
    ],
  },
]

export default tabs
