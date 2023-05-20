import { ReactNode } from 'react'
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineWallet,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'

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
  { key: 'home', label: <Link to="/home">Home</Link>, icon: <AiOutlineHome /> },
  {
    key: 'jobs',
    label: <Link to="/jobs">Jobs</Link>,
    icon: <AiOutlineWallet />,
  },
  {
    key: 'candidates',
    label: <Link to="/candidates">Candidates</Link>,
    icon: <AiOutlineTeam />,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <AiOutlineSetting />,
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
