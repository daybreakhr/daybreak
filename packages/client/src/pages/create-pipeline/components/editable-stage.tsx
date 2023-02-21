import { Button, Form, Input } from 'antd'

type EditableStageProps = {
  initialValues?: any
  onClose: () => void
}

export default function EditableStage({
  initialValues,
  onClose,
}: EditableStageProps) {
  return (
    <Form
      layout="inline"
      initialValues={initialValues}
      className="flex items-center px-4 py-3 border rounded"
    >
      <div className="w-4 h-4 mr-4" style={{ backgroundColor: 'red' }} />
      <Form.Item name="title" className="w-64">
        <Input placeholder="Stage Name..." />
      </Form.Item>

      <Form.Item name="description" className="w-96">
        <Input placeholder="Description.." />
      </Form.Item>

      <div className="flex-1" />

      <Button className="mr-4" onClick={onClose}>
        Cancel
      </Button>

      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form>
  )
}
