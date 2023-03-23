import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, message } from 'antd'
import { createInterview, updateInterview } from '../queries'

type EditableStageProps = {
  initialValues?: any
  onClose: () => void
  onSave?: () => void
  jobId: string
  order?: number
}

export default function EditableStage({
  initialValues,
  onClose,
  jobId,
  order,
}: EditableStageProps) {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const onSuccess = () => {
    queryClient.invalidateQueries(['interviews'])
    form.resetFields()
    onClose()
  }
  const onError = (error: any) => {
    const errMsg = error?.response?.data?.error
    if (errMsg) {
      message.error(errMsg)
    }
  }

  const { mutate: create, isLoading: isLoadingCreate } = useMutation(
    createInterview,
    {
      onSuccess,
      onError,
    },
  )
  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(
    updateInterview,
    {
      onSuccess,
      onError,
    },
  )

  const handleSubmit = () => {
    form.validateFields().then(async (values: any) => {
      if (initialValues?.id) {
        update({
          title: values.title,
          jobId,

          id: initialValues.id,
        })
      } else {
        create({ title: values.title, jobId, order })
      }
    })
  }

  return (
    <Form
      form={form}
      layout="inline"
      initialValues={initialValues}
      onFinish={handleSubmit}
      className="flex items-center px-4 py-3 border rounded"
    >
      {/* <div className="w-4 h-4 mr-4" style={{ backgroundColor: 'red' }} /> */}
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

      <Button
        type="primary"
        htmlType="submit"
        loading={isLoadingCreate || isLoadingUpdate}
      >
        Save
      </Button>
    </Form>
  )
}
