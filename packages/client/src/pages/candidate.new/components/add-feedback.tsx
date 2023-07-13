import { Avatar, Input, Modal, Select } from 'antd'
import useAuth from 'hooks/use-auth'

type AddFeedbackProps = {
  isOpen: boolean
  onClose: () => void
}

export default function AddFeedback({ isOpen, onClose }: AddFeedbackProps) {
  const { user } = useAuth()

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
