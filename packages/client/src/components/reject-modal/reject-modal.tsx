import { useState } from 'react'
import { Button, Checkbox, Input, Modal } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { rejectionReasons } from './rejection-reasons'

type RejectModalProps = {
  isOpen: boolean
  onClose: () => void
  onReject: (reasons: string[], notes: string) => void
}

export default function RejectModal({
  isOpen,
  onClose,
  onReject,
}: RejectModalProps) {
  const [sendMail, setSendMail] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [checked, setChecked] = useState(
    rejectionReasons.reduce(
      (acc, { name }) => ({ ...acc, [name]: [] }),
      {} as Record<string, CheckboxValueType[]>,
    ),
  )

  const isDisabled = Object.values(checked).every((value) => value.length === 0)

  function handleReject() {
    const reasons = Object.values(checked)
      .reduce((acc, value) => [...acc, ...value], [] as string[])
      .map((value) => `${value}`)

    onReject(reasons, additionalNotes)
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Rejecting Candidate"
      footer={
        <div className="flex items-center justify-between">
          <Checkbox
            checked={sendMail}
            onChange={(e) => setSendMail(e.target.checked)}
          >
            Send Mail
          </Checkbox>
          <Button
            danger
            type="primary"
            disabled={isDisabled}
            onClick={handleReject}
          >
            Reject
          </Button>
        </div>
      }
    >
      <div className="mt-4 overflow-y-auto h-80">
        {rejectionReasons.map(({ name, title, reasons }) => (
          <div key={title} className="mb-4">
            <p className="mb-4 text-xs font-medium text-gray-500">{title}</p>
            <div className="px-4 vertical-checkbox">
              <Checkbox.Group
                options={reasons}
                value={checked[name]}
                onChange={(values) => {
                  setChecked((prev) => ({ ...prev, [name]: values }))
                }}
                className="w-full space-y-3"
              />
            </div>
          </div>
        ))}
      </div>

      <hr className="mb-4 -mx-6" />

      <Input
        value={additionalNotes}
        className="bg-gray-50"
        placeholder="Write additional feedback..."
        onChange={(e) => setAdditionalNotes(e.target.value)}
      />
    </Modal>
  )
}
