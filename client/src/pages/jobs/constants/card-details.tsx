import {
  AiOutlineCarryOut,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
  AiOutlineSolution,
} from 'react-icons/ai'

export const cardDetails = [
  {
    title: 'Active Jobs',
    count: 2,
    description: 'Total Jobs',
    icon: <AiOutlineInfoCircle className="text-blue-700 bg-blue-50" />,
  },
  {
    title: 'Jobs with Process Today',
    count: 0,
    description: 'Last week analytics',
    icon: <AiOutlineCarryOut className="text-green-700 bg-green-50" />,
  },
  {
    title: 'Jobs Assigned To Me',
    count: 2,
    description: 'Last week analytics',
    icon: <AiOutlineSolution className="text-orange-700 bg-orange-50" />,
  },
  {
    title: 'High Priority Jobs',
    count: 1,
    description: 'Last week analytics',
    icon: <AiOutlineExclamationCircle className="text-red-700 bg-red-50" />,
  },
]
