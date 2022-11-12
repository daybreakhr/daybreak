import { Button } from 'antd'
import IconButton from 'components/icon-button'
import dayjs from 'dayjs'
import {
  AiFillLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from 'react-icons/ai'
import { Candidate } from 'types/candidate'
import { Switch } from 'ui-kit'

type DetailsProps = {
  data: Candidate | undefined
  isLoading: boolean
}

export default function Details({ data, isLoading }: DetailsProps) {
  return (
    <div className="flex flex-col items-center flex-none py-6 bg-white rounded-md shadow-md w-80 h-fit">
      <div className="p-3 mb-4 text-6xl bg-gray-400 rounded-full text-gray-50">
        <AiOutlineUser />
      </div>

      <Switch>
        <Switch.Match when={isLoading}>
          <div className="w-20 h-6 mt-1 bg-gray-100 rounded animate-pulse" />
        </Switch.Match>

        <Switch.Match when={data}>
          {({ firstName, middleName, lastName }) => (
            <p className="mb-1 text-base font-medium">
              {firstName} {middleName ?? ''} {lastName}
            </p>
          )}
        </Switch.Match>
      </Switch>

      <p className="mb-4 text-xs text-gray-600">
        Applied on {dayjs(data?.createdAt).format('MMMM D, YYYY')}
      </p>

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
            {/* Create a util called getJobType for human readable version */}
            <span>{data?.Job.jobType}</span>
            <span>Bengaluru</span>
          </p>
        </div>
      </div>
    </div>
  )
}
