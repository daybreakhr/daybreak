import { Button, Skeleton } from 'antd'
import {
  HiOutlineCalendar,
  HiOutlineChatAlt,
  HiOutlineMail,
  HiThumbDown,
  HiThumbUp,
} from 'react-icons/hi'

import useAuth from 'hooks/use-auth'
import { Candidate } from 'types/candidate'
import { CandidateStatus } from '@prisma/client'
import { useMemo } from 'react'
import { capitalize } from 'lodash'
import { Show } from 'ui-kit'

type ActionsProps = {
  isLoading: boolean
  candidate: Candidate | undefined
}

export default function Actions({ candidate, isLoading }: ActionsProps) {
  const { user } = useAuth()

  const currentRound = useMemo(() => {
    if (
      candidate?.status === CandidateStatus.interview &&
      candidate.interviewId
    ) {
      return candidate.Job.Interview.find(
        ({ id }) => id === candidate.interviewId,
      )?.title
    } else {
      return candidate?.status
    }
  }, [candidate])

  return (
    <div className="flex-none w-64 pt-6 pl-6">
      <div className="px-4 py-2 space-y-2 border-t rounded-t-md border-x">
        <p className="font-medium text-gray-700 text-xxs">CURRENT ROUND</p>
        <Show
          when={!isLoading}
          fallback={<Skeleton paragraph={false} active />}
        >
          <p className="font-medium text-success-600">
            {capitalize(currentRound)}
          </p>
        </Show>
      </div>
      <div className="px-4 py-2 border-t border-x">
        <p className="font-medium text-gray-700 text-xxs">NEXT ROUND</p>
      </div>
      <div className="flex items-center px-4 py-2 mb-4 space-x-2 text-white border rounded-b-md border-success-600 bg-success-600">
        <HiThumbUp />
        <span>Move to next round</span>
      </div>

      <div className="flex flex-col space-y-2">
        <div>
          <Button icon={<HiThumbDown className="anticon" />} type="text" danger>
            Reject
          </Button>
        </div>

        <div>
          <Button type="text" icon={<HiOutlineChatAlt className="anticon" />}>
            Add Feedback
          </Button>
        </div>

        <div>
          <Button type="text" icon={<HiOutlineCalendar className="anticon" />}>
            Schedule an Interview
          </Button>
        </div>

        <div>
          <Button type="text" icon={<HiOutlineMail className="anticon" />}>
            Send Mail
          </Button>
          <span className="ml-4 text-xs text-gray-500">({user?.email})</span>
        </div>
      </div>
    </div>
  )
}
