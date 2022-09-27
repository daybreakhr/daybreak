import { Button } from 'antd'
import IconButton from 'components/icon-button/icon-button'
import {
  AiFillLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePushpin,
  AiOutlineUser,
} from 'react-icons/ai'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'
import { sampleData } from '../constants/profile-list'
import ProgressBar from './progressbar'

export default function Details() {
  return (
    <div className="flex flex-col items-center w-1/3 py-6 bg-white rounded-md shadow-md h-fit">
      <div className="p-3 mb-4 text-6xl bg-gray-400 rounded-full text-gray-50">
        <AiOutlineUser />
      </div>

      <p className="mb-1 text-base font-medium">
        {sampleData.firstname} {sampleData.lastname}
      </p>
      <p className="mb-4 text-xs text-gray-600">Applied Today</p>

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
        <IconButton className="text-red-500">
          <FiThumbsDown />
        </IconButton>

        <Button>Rating</Button>
        <Button type="primary">Advance</Button>

        <IconButton className="text-green-700">
          <FiThumbsUp />
        </IconButton>
      </div>

      <hr className="w-full my-4 border-gray-300" />

      <div className="w-full px-4">
        <p className="mb-2 text-xs text-gray-500 uppercase">Applied Jobs</p>
        <div className="px-4 py-2 bg-gray-100 rounded-md">
          <p className="font-medium">Full Stack Engineer</p>
          <p className="space-x-4 text-xs text-gray-600">
            <span>Full Time</span>
            <span>Bengaluru</span>
          </p>
        </div>
        <div className="px-2 py-2 my-4 border rounded-md place-items-center">
          <ProgressBar />
        </div>
        <div className="ml-14">
          <div className="flex items-center my-5">
            <IconButton>
              <AiOutlineMail size="20px" />
            </IconButton>
            <div className="flex flex-col ml-10">
              <p className="mx-1 font-medium">E-mail</p>
              <a
                target="_blank"
                rel="noreferrer"
                className="mx-1"
                href={`mailto:${sampleData.email}`}
              >
                {sampleData.email}
              </a>
            </div>
          </div>

          <div className="flex items-center my-5">
            <IconButton>
              <AiOutlinePhone size="20px" />
            </IconButton>
            <div className="flex flex-col ml-10">
              <p className="mx-1 font-medium">Phone</p>
              <p className="mx-1 text-sm">{sampleData.phone}</p>
            </div>
          </div>

          <div className="flex items-center my-5">
            <IconButton>
              <AiOutlinePushpin size="20px" />
            </IconButton>
            <div className="flex flex-col ml-10">
              <p className="mx-1 font-medium">Address</p>
              <p className="mx-1 text-sm">{sampleData.address}</p>
            </div>
          </div>

          <div className="flex items-center my-5">
            <IconButton>
              <AiFillLinkedin size="20px" />
            </IconButton>
            <div className="flex flex-col ml-10">
              <p className="mx-1 font-medium">Linkedin</p>
              <a
                className="mx-1"
                target="_blank"
                rel="noreferrer"
                href={sampleData.linkedinurl}
              >
                {sampleData.linkedinurl}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
