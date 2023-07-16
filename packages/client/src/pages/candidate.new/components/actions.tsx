import { useMemo, useState } from 'react'
import { capitalize } from 'lodash'
import { CandidateStatus } from '@prisma/client'
import { useSearchParams } from 'react-router-dom'
import { Button, ButtonProps, Skeleton, message } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  HiOutlineCalendar,
  HiOutlineChatAlt,
  HiOutlineMail,
  HiThumbDown,
  HiThumbUp,
} from 'react-icons/hi'

import { Show } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import { Candidate } from 'types/candidate'
import RejectModal from 'components/reject-modal'
import { updateCandidate } from 'pages/candidate/queries'

import AddFeedback from './add-feedback'
import ScheduleModal from './schedule-modal'

type ActionsProps = {
  isLoading: boolean
  candidate: Candidate | undefined
}

export default function Actions({ candidate, isLoading }: ActionsProps) {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') ?? ''
  const [candidateRejectForm, setCandidateRejectForm] = useState(false)
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false)

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

  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(updateCandidate, {
    onSuccess: ({ status }) => {
      if (status === CandidateStatus.rejected) {
        message.success('Candidate is now moved to Rejected state!')
        setCandidateRejectForm(false)
      } else {
        message.success('The status has been successfully updated!')
      }

      queryClient.invalidateQueries(['candidate', candidateId])
      queryClient.invalidateQueries(['candidates'])
    },
  })

  async function handleRejectCandidate(reasons: string[], notes: string) {
    await mutateAsync({
      candidateId,
      body: {
        status: CandidateStatus.rejected,
        rejectionReasons: reasons,
        rejectionNotes: notes,
      },
    })
  }

  const actionButtons: ButtonProps[] = [
    {
      danger: true,
      type: 'text',
      children: 'Reject',
      icon: <HiThumbDown className="anticon" />,
      onClick: () => setCandidateRejectForm(true),
    },
    {
      type: 'text',
      children: 'Add Feedback',
      icon: <HiOutlineChatAlt className="anticon" />,
      onClick: () => setIsFeedbackFormVisible(true),
    },
    {
      type: 'text',
      children: 'Schedule an Interview',
      icon: <HiOutlineCalendar className="anticon" />,
      onClick: () => setIsCalendarModalOpen(true),
    },
  ]

  return (
    <>
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
          {actionButtons.map((props, index) => (
            <div key={index}>
              <Button {...props} />
            </div>
          ))}

          <div>
            <Button type="text" icon={<HiOutlineMail className="anticon" />}>
              Send Mail
            </Button>
            <span className="ml-4 text-xs text-gray-500">({user?.email})</span>
          </div>
        </div>
      </div>

      <RejectModal
        isRejecting={isLoading}
        isOpen={candidateRejectForm}
        onReject={handleRejectCandidate}
        onClose={() => setCandidateRejectForm(false)}
      />

      <AddFeedback
        isOpen={isFeedbackFormVisible}
        onClose={() => setIsFeedbackFormVisible(false)}
      />

      <ScheduleModal
        isModalOpen={isCalendarModalOpen}
        onCancel={() => setIsCalendarModalOpen(false)}
      />
    </>
  )
}
