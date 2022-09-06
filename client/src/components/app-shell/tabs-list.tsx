import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineWallet,
} from 'react-icons/ai'

const tabs = [
  { key: 'home', label: 'Home', icon: <AiOutlineHome /> },
  {
    key: 'candidates',
    label: 'Candidates',
    icon: <AiOutlineTeam />,
  },
  { key: 'jobs', label: 'Jobs', icon: <AiOutlineWallet /> },
  {
    key: 'members',
    label: 'Members',
    icon: <AiOutlineSetting />,
  },
]

export default tabs
