import { Form, Modal, message, Input } from 'antd'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CandidateStatus } from '@prisma/client'
import { updateCandidate } from '../queries'

type CandidateRejectFormProps = {
  visible: boolean
  onCancel: () => void
}

const { TextArea } = Input

export default function CandidateRejectForm({
  visible,
  onCancel,
}: CandidateRejectFormProps) {
  const [form] = Form.useForm()
  const { candidateId = '' } = useParams()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(updateCandidate, {
    onSuccess: () => {
      message.info('This job application is rejected!')
      queryClient.invalidateQueries(['candidate', candidateId])
      queryClient.invalidateQueries(['candidates'])
      onCancel()
    },
  })
  function handleOk() {
    mutate({ candidateId, body: { status: CandidateStatus.rejected } })
  }

  function handleCancel() {
    onCancel()
    form.resetFields()
  }

  return (
    <Modal
      title="Candidate Rejection"
      destroyOnClose
      onOk={handleOk}
      open={visible}
      onCancel={handleCancel}
      okText="Reject"
      okButtonProps={{ danger: true }}
    >
      <Form form={form} layout="vertical">
        <Form.Item required name="reason" label="Reason for rejection:">
          <TextArea
            required
            rows={4}
            className="resize-none"
            placeholder="Please specify the reason that lead to rejection..."
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
