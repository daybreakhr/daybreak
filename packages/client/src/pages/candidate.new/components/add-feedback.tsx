import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Avatar, Input, Modal, Rate, Select } from 'antd'

import useAuth from 'hooks/use-auth'
import { fetchInterviews } from 'pages/create-pipeline/queries'
import { HiX } from 'react-icons/hi'

type AddFeedbackProps = {
  isOpen: boolean
  onClose: () => void
}

export default function AddFeedback({ isOpen, onClose }: AddFeedbackProps) {
  const { user } = useAuth()
  const { jobId = '' } = useParams()

  const { data } = useQuery(['interviews', jobId], () => fetchInterviews(jobId))

  return (
    <Modal
      title="Add Feedback"
      open={isOpen}
      onCancel={onClose}
      okText="Submit Feedback"
    >
      <Select
        className="w-full mt-5 mb-10"
        placeholder="Select an interview round..."
        options={data?.map(({ id, title }) => ({ value: id, label: title }))}
      />

      <p className="mb-3 text-gray-600">
        Your overall opinion for this Candidate
      </p>
      <div className="flex items-center mb-10 space-x-3">
        <button className="px-3 py-1.5 bg-transparent border rounded-full">
          🚫 Strong No
        </button>
        <button className="px-3 py-1.5 bg-transparent border rounded-full">
          👎 No
        </button>
        <button className="px-3 py-1.5 bg-transparent border rounded-full">
          👍 Yes
        </button>
        <button className="px-3 py-1.5 bg-transparent border rounded-full">
          🏆 Strong Yes
        </button>
      </div>

      <p className="text-gray-600">Provide more feedback</p>

      <hr className="my-3" />

      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex group items-center justify-between w-64 px-3 py-1.5 font-medium rounded hover:bg-gray-100">
            <span>Attitude</span>
            <button className="hidden text-gray-600 group-hover:block">
              <HiX />
            </button>
          </div>

          <Rate />
        </div>
        <Select className="w-64" removeIcon placeholder="+ Add more" />
      </div>

      <div className="flex space-x-3">
        <Avatar className="flex-none" src={user?.photoURL} />
        <Input.TextArea
          rows={3}
          style={{ resize: 'none' }}
          placeholder="Add notes/feedback"
        />
      </div>
    </Modal>
  )
}
