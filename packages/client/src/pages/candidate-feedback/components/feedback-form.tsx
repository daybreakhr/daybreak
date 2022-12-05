import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Input, Modal, Rate } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Feedback } from 'types/candidate'

type FeedbackFormProps = {
  visible: boolean
  title: string
  onCancel: () => void
  initialValues?: { id: string; title: string; notes: string; score: number }
  mutationFunc: (args: any) => Promise<Feedback>
}

export default function FeedbackForm({
  visible,
  title,
  onCancel,
  initialValues,
  mutationFunc,
}: FeedbackFormProps) {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const { candidateId = '' } = useParams()

  const { mutate, isLoading } = useMutation(mutationFunc, {
    onSuccess: () => {
      onCancel()
      queryClient.invalidateQueries(['feedbacks', candidateId])
      form.resetFields()
    },
  })

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      title={title}
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={({ id, ...values }) => {
          if (id) {
            mutate({ id, candidateId, body: values })
          } else {
            mutate({ candidateId, body: values })
          }
        }}
      >
        <Form.Item name="id" noStyle />
        <Form.Item name="title" label="Interview Round" required>
          <Input placeholder="Enter a name for the interview round..." />
        </Form.Item>

        <Form.Item name="notes" label="Interview Notes" required>
          <Input.TextArea
            rows={4}
            placeholder="Enter your interview feedback notes..."
          />
        </Form.Item>

        <Form.Item name="score" label="Interview Score" required>
          <Rate allowHalf />
        </Form.Item>
      </Form>
    </Modal>
  )
}
