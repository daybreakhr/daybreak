import { Button } from 'antd'
import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { HiOutlineCalendar, HiOutlineMail } from 'react-icons/hi'
import { HiOutlineChatBubbleLeftEllipsis } from 'react-icons/hi2'

import useAuth from 'hooks/use-auth'

export default function Actions() {
  const { user } = useAuth()

  return (
    <div className="flex-none w-64 pt-6 pl-6">
      <p className="mb-4 text-xs">
        <span className="text-gray-500">Current Round:</span>{' '}
        <span className="text-primary-500">Phone Screen</span>
      </p>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center justify-between px-4 py-2 text-gray-500 bg-gray-100 rounded-md">
          Move Candidate
          <DownOutlined />
        </div>

        <div className="flex items-center px-4 py-2 space-x-2 border rounded-md">
          <div className="text-xl">👍</div>
          <div>
            <p className="text-xs text-gray-500">Move to next round</p>
            <p>On-site Coding</p>
          </div>
        </div>

        <div className="px-4 py-2 space-y-2 border rounded-md">
          <span className="inline-flex p-1 text-xl rounded-md bg-primary-50 text-primary-500">
            <HiOutlineCalendar />
          </span>
          <div className="flex items-center justify-between">
            <p>Schedule an interview</p>
            <RightOutlined />
          </div>
        </div>

        <div className="px-4 py-2 border rounded-md">
          <span className="inline-flex p-1 mb-2 text-xl rounded-md bg-primary-50 text-primary-500">
            <HiOutlineMail />
          </span>
          <div className="flex items-center justify-between">
            <p>Send Mail</p>
            <RightOutlined />
          </div>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        <div className="px-4 py-2 border rounded-md">
          <span className="inline-flex p-1 mb-2 text-xl rounded-md bg-primary-50 text-primary-500">
            <HiOutlineChatBubbleLeftEllipsis />
          </span>
          <div className="flex items-center justify-between">
            <p>Add Feedback</p>
            <RightOutlined />
          </div>
        </div>

        <Button block danger>
          Reject
        </Button>
      </div>
    </div>
  )
}
