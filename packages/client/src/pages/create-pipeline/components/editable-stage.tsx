import { Button, Form, Input } from 'antd'

export type InterviewData = {
  title: string
  identifier: string
}

type EditableStageProps = {
  isUpdating: boolean
  initialValues?: InterviewData
  onClose: () => void
  onSave: (values: InterviewData) => void
}

export default function EditableStage({
  isUpdating,
  initialValues,
  onClose,
  onSave,
}: EditableStageProps) {
  return (
    <Form
      layout="inline"
      onFinish={onSave}
      initialValues={initialValues}
      className="flex items-center px-4 py-3 border rounded"
    >
      {/* @Todo: Add form field to select color */}
      <div className="w-4 h-4 mr-4" style={{ backgroundColor: 'red' }} />
      <Form.Item name="title" className="w-64">
        <Input autoFocus placeholder="Stage Name..." />
      </Form.Item>

      <div className="flex-1" />

      <Button className="mr-4" onClick={onClose}>
        Cancel
      </Button>

      <Button type="primary" htmlType="submit" loading={isUpdating}>
        Save
      </Button>
    </Form>
  )
}
