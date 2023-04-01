import {
  AiOutlineHome,
  AiOutlineFire,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineWallet,
} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const tabs = [
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
    key: 'referrals',
    label: <Link to="/referrals/jobList">Referrals</Link>,
    icon: <AiOutlineFire />,
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
    ],
  },
]

export default tabs
