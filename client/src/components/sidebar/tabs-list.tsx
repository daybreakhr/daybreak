import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineWallet,
} from 'react-icons/ai'

const tabs = [
  { key: 'home', label: 'Home', icon: <AiOutlineHome /> },
  { key: 'jobs', label: 'Jobs', icon: <AiOutlineWallet /> },
  {
    key: 'candidates',
    label: 'Candidates',
    icon: <AiOutlineTeam />,
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <AiOutlineSetting />,
    children: [
      { key: 'settings/organisation', label: 'Organisation' },
      { key: 'settings/members', label: 'Members' },
    ],
  },
]

export default tabs
