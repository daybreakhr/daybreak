import { useMemo, useState } from 'react'
import { capitalize } from 'lodash'
import { CandidateStatus } from '@prisma/client'
import { useSearchParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, ButtonProps, Dropdown, MenuProps, message } from 'antd'
import { CalendarOutlined, DownOutlined, MailOutlined } from '@ant-design/icons'
import { HiOutlineChatAlt, HiThumbDown } from 'react-icons/hi'

import { Show, Switch } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import { Candidate } from 'types/candidate'
import { getPipelineStages } from 'utils/utils'
import RejectModal from 'components/reject-modal'
import { updateCandidate } from 'pages/candidate/queries'

import AddFeedback from './add-feedback'
import ScheduleModal from './schedule-modal'
import MailModal from './mail-modal'
import ReEnrollConfirmation from './re-enroll-confirmation'

type ActionsProps = {
  isLoading: boolean
  candidate: Candidate | undefined
}

export default function Actions({ candidate, isLoading }: ActionsProps) {
  const { user, member } = useAuth()
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') ?? ''
  const [isMailModalOpen, setIsMailModalOpen] = useState(false)
  const [candidateRejectForm, setCandidateRejectForm] = useState(false)
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  const [isFeedbackFormVisible, setIsFeedbackFormVisible] = useState(false)
  const [candidateReEnrollConfirmation, setReEnrollConfirmation] =
    useState(false)

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
  const { mutateAsync, mutate } = useMutation(updateCandidate, {
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

  const items: MenuProps['items'] = getPipelineStages(
    candidate?.Job.Interview ?? [],
  )
    .slice(0, -1)
    .map(({ label, value }) => {
      return { key: value, label }
    })

  const actionButtons: (ButtonProps & { subTitle?: string })[] = [
    {
      danger: true,
      type: 'text',
      children: 'Reject',
      icon: <HiThumbDown className="anticon" />,
      disabled: candidate?.status === CandidateStatus.rejected,
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
      icon: <CalendarOutlined />,
      onClick: () => setIsCalendarModalOpen(true),
      disabled:
        !member?.Integration?.gcal?.isInstalled ||
        candidate?.status === CandidateStatus.rejected,
    },
    {
      type: 'text',
      children: 'Send Mail',
      icon: <MailOutlined />,
      onClick: () => setIsMailModalOpen(true),
      disabled:
        !member?.Integration?.gmail?.isInstalled ||
        candidate?.status === CandidateStatus.rejected,
      subTitle: `(${user?.email})`,
    },
  ]

  const handleStatusChange: MenuProps['onClick'] = ({ key }) => {
    const status = CandidateStatus[key as keyof typeof CandidateStatus]
    if (status) {
      mutate({ candidateId, body: { status } })
    } else {
      mutate({
        candidateId,
        body: { interviewId: key, status: CandidateStatus.interview },
      })
    }
  }

  return (
    <>
      <div className="flex-none w-64 pt-6 pl-6">
        <p className="mb-2 text-xs">
          <span className="text-gray-500">Current Round:</span>{' '}
          <span className="text-primary-500">{capitalize(currentRound)}</span>
        </p>
        <Switch>
          <Switch.Match when={candidate?.status !== CandidateStatus.rejected}>
            <Dropdown menu={{ items, onClick: handleStatusChange }}>
              <div className="flex items-center justify-between w-56 px-3 py-1.5 mb-4 text-gray-500 rounded-md bg-gray-50 border border-gray-100">
                <span>Move Candidate</span>
                <DownOutlined />
              </div>
            </Dropdown>
          </Switch.Match>

          <Switch.Match when={candidate?.status === CandidateStatus.rejected}>
            <Button
              block
              type="primary"
              className="mb-4"
              onClick={() => setReEnrollConfirmation(true)}
            >
              Re-Enroll
            </Button>
          </Switch.Match>
        </Switch>

        <div className="flex flex-col space-y-2">
          {actionButtons.map(({ subTitle, ...props }, index) => (
            <div key={index}>
              <Button {...props} />
              <Show when={subTitle}>
                <span className="ml-4 text-xs text-gray-500">{subTitle}</span>
              </Show>
            </div>
          ))}
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

      <MailModal
        isOpen={isMailModalOpen}
        onClose={() => setIsMailModalOpen(false)}
      />

      <ReEnrollConfirmation
        isOpen={candidateReEnrollConfirmation}
        onCancel={() => setReEnrollConfirmation(false)}
      />
    </>
  )
}
