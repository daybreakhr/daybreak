import { Modal, message } from 'antd'
import { CandidateStatus } from '@prisma/client'
import { useSearchParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCandidate } from '../queries'

type ReEnrollConfirmationProps = {
  isOpen: boolean
  onCancel: () => void
}

export default function ReEnrollConfirmation({
  isOpen,
  onCancel,
}: ReEnrollConfirmationProps) {
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') ?? ''

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(updateCandidate, {
    onSuccess: () => {
      message.info('This job application is Re-Enrolled!')
      queryClient.invalidateQueries(['candidate', candidateId])
      queryClient.invalidateQueries(['candidates'])
      onCancel()
    },
  })

  function handleOk() {
    mutate({ candidateId, body: { status: CandidateStatus.applied } })
  }

  return (
    <Modal
      title="Candidate Rejection"
      destroyOnClose
      onOk={handleOk}
      open={isOpen}
      onCancel={onCancel}
      okText="Yes"
      cancelText="No"
      okButtonProps={{ loading: isLoading }}
    >
      Are You Sure You Want To Re-Enroll This Candidate?
    </Modal>
  )
}
