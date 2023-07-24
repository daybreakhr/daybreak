import { DeleteOutlined } from '@ant-design/icons'
import { useParams, useSearchParams } from 'react-router-dom'
import { Avatar, Button, Form, Input, Modal, Rate, Select } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import useAuth from 'hooks/use-auth'
import { fetchInterviews } from 'pages/create-pipeline/queries'

import { createFeedback, fetchFeedbacks } from '../queries'
import FeedbackRadio from './feedback-radio'
import { feedbackList } from '../constants/feedback-list'

type AddFeedbackProps = {
  isOpen: boolean
  onClose: () => void
}

const getInitialValues = (candidateId: string) => ({
  interviewId: undefined,
  candidateId,
  evaluation: undefined,
  notes: undefined,
  attributes: [
    { name: feedbackList[0], score: undefined },
    { name: feedbackList[1], score: undefined },
  ],
})

export default function AddFeedback({ isOpen, onClose }: AddFeedbackProps) {
  const { user } = useAuth()
  const [form] = Form.useForm()
  const { jobId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') || ''

  const { data: interviews } = useQuery(['interviews', jobId], () =>
    fetchInterviews(jobId),
  )

  const { data: feedbacks } = useQuery(
    ['feedbacks', candidateId],
    () => fetchFeedbacks(candidateId),
    { enabled: !!candidateId },
  )

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(createFeedback, {
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks', candidateId])
      form.resetFields()
      onClose()
    },
  })

  function handleSubmit() {
    form.validateFields().then((values) => {
      mutate(values)
    })
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      title="Add Feedback"
      okText="Submit Feedback"
      okButtonProps={{ loading: isLoading }}
    >
      <Form
        form={form}
        className="pt-4"
        layout="vertical"
        initialValues={getInitialValues(candidateId)}
      >
        <Form.Item name="candidateId" noStyle />

        <Form.Item
          name="interviewId"
          rules={[{ required: true, message: 'Select Interview round!' }]}
        >
          <Select
            className="w-full"
            placeholder="Select an interview round..."
            options={interviews
              ?.filter(({ id }) =>
                feedbacks?.every(({ Interview }) => id !== Interview.id),
              )
              ?.map(({ id, title }) => {
                return { value: id, label: title }
              })}
          />
        </Form.Item>

        <p className="mb-3 text-gray-600">
          Your overall opinion for this Candidate
        </p>
        <Form.Item
          name="evaluation"
          rules={[
            {
              required: true,
              message: 'Evaluate candidate on their interview performance',
            },
          ]}
        >
          <FeedbackRadio />
        </Form.Item>

        <p className="text-gray-600">Provide more feedback</p>
        <hr className="my-2" />

        <div className="mb-6">
          <Form.List name="attributes">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div key={field.key} className="flex items-center space-x-2">
                    <Form.Item
                      {...field}
                      className="w-56"
                      name={[field.name, 'name']}
                      rules={[
                        { required: true, message: 'Select a skill attribute' },
                      ]}
                    >
                      <Select
                        allowClear
                        placeholder="Select feedback"
                        options={feedbackList.map((name) => {
                          return { value: name, label: name }
                        })}
                      />
                    </Form.Item>

                    <div className="flex-1" />

                    <Form.Item
                      {...field}
                      name={[field.name, 'score']}
                      rules={[{ required: true, message: 'Assign a score' }]}
                    >
                      <Rate />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        danger
                        size="small"
                        type="text"
                        icon={<DeleteOutlined className="text-xs" />}
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
                  </div>
                ))}

                <Button type="text" onClick={() => add()}>
                  + Add more
                </Button>
              </>
            )}
          </Form.List>
        </div>

        <div className="flex space-x-3">
          <Avatar className="flex-none" src={user?.photoURL} />
          <Form.Item name="notes" className="w-full">
            <Input.TextArea
              rows={3}
              style={{ resize: 'none' }}
              placeholder="Add notes/feedback"
            />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}
