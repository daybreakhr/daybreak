import { ReactNode } from 'react'

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
  { key: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
  { key: 'jobs', label: 'All Jobs', icon: <BreifcaseIcon /> },
  {
    key: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    children: [
      { key: 'settings/organisation', label: 'Organisation' },
      { key: 'settings/members', label: 'Members' },
      { key: 'settings/email-templates', label: 'Email Templates' },
    ],
  },
]

export default tabs
