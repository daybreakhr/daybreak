import { Button } from 'antd'
import IconButton from 'components/icon-button'
import {
  AiFillLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from 'react-icons/ai'
import { sampleData } from '../constants/profile-list'
import ProgressBar from './progressbar'

export default function Details() {
  return (
    <div className="flex flex-col items-center flex-none py-6 bg-white rounded-md shadow-md w-1/4 h-fit">
      <div className="p-3 mb-4 text-6xl bg-gray-400 rounded-full text-gray-50">
        <AiOutlineUser />
      </div>

      <p className="mb-1 text-base font-medium">{sampleData.name}</p>
      <p className="mb-4 text-xs text-gray-600">Applied on 28th Sept, 2022</p>

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

      <hr className="w-full my-4 border-gray-300" />

      <div className="flex items-center space-x-4">
        <Button danger>Decline</Button>
        <Button type="primary">Advance</Button>
      </div>

      <hr className="w-full my-4 border-gray-300" />

      <div className="w-full px-4">
        <p className="mb-2 text-xs text-gray-500 uppercase">Applied Jobs</p>
        <div className="px-4 py-2 bg-gray-100 rounded-md">
          <p className="font-medium">Full Stack Engineer</p>
          <p className="space-x-4 text-xs text-gray-500">
            <span>Full Time</span>
            <span>Bengaluru</span>
          </p>
        </div>
        <div className="px-2 py-2 my-4 border rounded-md place-items-center">
          <ProgressBar />
        </div>
      </div>
    </div>
  )
}
