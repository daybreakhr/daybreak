import { Button, Checkbox, Input, Modal } from 'antd'
import { rejectionReasons } from '../constants/rejection-reasons'

type RejectModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function RejectModal({ isOpen, onClose }: RejectModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Rejecting Candidate"
      footer={
        <div className="flex items-center justify-between">
          <Checkbox key="mail-checkbox">Send Mail</Checkbox>
          <Button key="reject" danger type="primary" onClick={onClose}>
            Reject
          </Button>
        </div>
      }
    >
      <div className="mt-4 overflow-y-auto h-80">
        {rejectionReasons.map(({ title, reasons }) => (
          <div key={title} className="mb-4">
            <p className="mb-2 text-xs font-medium text-gray-500">{title}</p>
            <ul className="px-4 space-y-3">
              {reasons.map((reason) => (
                <li key={reason} className="text-sm text-gray-800">
                  <Checkbox className="text-gray-700">{reason}</Checkbox>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="my-4 -mx-6" />

      <Input
        className="bg-gray-50"
        placeholder="Write additional feedback..."
      />
    </Modal>
  )
}
