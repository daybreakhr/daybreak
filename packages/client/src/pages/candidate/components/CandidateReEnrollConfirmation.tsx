import { Modal, message } from 'antd'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CandidateStatus } from '@prisma/client'
import { updateCandidate } from '../queries'

type CandidateRejectFormProps = {
  visible: boolean
  onCancel: () => void
}

export default function CandidateReEnrollConfirmation({
  visible,
  onCancel,
}: CandidateRejectFormProps) {
  const { candidateId = '' } = useParams()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(updateCandidate, {
    onSuccess: () => {
      message.info('This job application is Re-Enrolled!')
      queryClient.invalidateQueries(['candidate', candidateId])
      queryClient.invalidateQueries(['candidates'])
    },
  })
  function handleOk() {
    mutate({ candidateId, body: { status: CandidateStatus.applied } })
  }
  function handleCancel() {
    onCancel()
  }
  return (
    <Modal
      title="Candidate Rejection"
      destroyOnClose
      onOk={handleOk}
      open={visible}
      onCancel={handleCancel}
      okText="Yes"
      cancelText="No"
    >
      Are You Sure You Want To Re-Enroll This Candidate?
    </Modal>
  )
}
