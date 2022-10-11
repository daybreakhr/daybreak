import { Button } from 'antd'
import IconButton from 'components/icon-button'
import {
  AiFillLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from 'react-icons/ai'
import { sampleData } from '../constants/profile-list'

export default function Details() {
  return (
    <div className="py-6 bg-white rounded-md shadow-md w-1/3 h-fit flex flex-col items-center">
      <div className="bg-gray-400 p-3 rounded-full text-gray-50 text-6xl mb-4">
        <AiOutlineUser />
      </div>

      <p className="text-base font-medium mb-1">{sampleData.name}</p>
      <p className="text-xs text-gray-600 mb-4">Applied on 28th Sept, 2022</p>

      <div className="flex items-center justify-center space-x-6">
        <IconButton>
          <AiOutlineMail />
        </IconButton>

        <IconButton>
          <AiOutlinePhone />
        </IconButton>

        <IconButton>
          <AiFillLinkedin />
        </IconButton>
      </div>

      <hr className="my-4 w-full border-gray-300" />

      <div className="flex items-center space-x-4">
        <Button danger>Decline</Button>
        <Button type="primary">Advance</Button>
      </div>

      <hr className="my-4 w-full border-gray-300" />

      <div className="w-full px-4">
        <p className="uppercase text-gray-500 text-xs mb-2">Applied Jobs</p>
        <div className="px-4 py-2 bg-gray-100 rounded-md">
          <p className="font-medium">Full Stack Engineer</p>
          <p className="text-gray-500 text-xs space-x-4">
            <span>Full Time</span>
            <span>Bengaluru</span>
          </p>
        </div>
      </div>
    </div>
  )
}
