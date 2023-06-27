import { useState } from 'react'
import { Button, Checkbox, Input, Modal } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { rejectionReasons } from './rejection-reasons'

type RejectModalProps = {
  isOpen: boolean
  onClose: () => void
  isRejecting: boolean
  onReject: (reasons: string[], notes: string) => Promise<void>
}

export default function RejectModal({
  isOpen,
  onClose,
  onReject,
  isRejecting,
}: RejectModalProps) {
  const initialReasons = rejectionReasons.reduce(
    (acc, { name }) => ({ ...acc, [name]: [] }),
    {} as Record<string, CheckboxValueType[]>,
  )

  const [sendMail, setSendMail] = useState(false)
  const [checked, setChecked] = useState(initialReasons)
  const [additionalNotes, setAdditionalNotes] = useState('')

  const isDisabled = Object.values(checked).every((value) => value.length === 0)

  function resetFormValues() {
    setSendMail(false)
    setAdditionalNotes('')
    setChecked(initialReasons)
  }

  async function handleReject() {
    const reasons = Object.values(checked)
      .reduce((acc, value) => [...acc, ...value], [] as string[])
      .map((value) => `${value}`)

    await onReject(reasons, additionalNotes)
    resetFormValues()
  }

  function handleClose() {
    onClose()
    resetFormValues()
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
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
            loading={isRejecting}
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
