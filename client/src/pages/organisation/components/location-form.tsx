import { useEffect } from 'react'
import { Form, Modal, Input } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Location } from '@prisma/client'

type LocationFormProps = {
  title: string
  visible: boolean
  onCancel: () => void
  initialValues?: { name: string; id: string }
  mutationFunc: (args: any) => Promise<Location>
}

export default function LocationForm({
  title,
  visible,
  onCancel,
  mutationFunc,
  initialValues,
}: LocationFormProps) {
  const [form] = Form.useForm()

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(mutationFunc, {
    onSuccess: () => {
      queryClient.invalidateQueries(['locations'])
      onCancel()
      form.resetFields()
    },
  })

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues, form])

  function handleOk() {
    form.submit()
  }

  function handleCancel() {
    onCancel()
    form.resetFields()
  }

  return (
    <Modal
      title={title}
      destroyOnClose
      onOk={handleOk}
      visible={visible}
      onCancel={handleCancel}
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={({ id, name }) => {
          if (id) {
            mutate({ name, id })
          } else {
            mutate({ name })
          }
        }}
      >
        <Form.Item name="id" noStyle />
        <Form.Item required name="name" label="Name">
          <Input placeholder="Enter Name..." />
        </Form.Item>
      </Form>
    </Modal>
  )
}
