import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineWallet,
} from 'react-icons/ai'

const tabs = [
  { key: 'home', label: 'Home', icon: <AiOutlineHome /> },
  {
    key: 'candidate',
    label: 'Candidate',
    icon: <AiOutlineTeam />,
  },
  { key: 'job-management', label: 'Job Management', icon: <AiOutlineWallet /> },
  {
    key: 'member-management',
    label: 'Member Management',
    icon: <AiOutlineSetting />,
  },
]

export default tabs
