import { useMemo } from 'react'
import { gapi } from 'gapi-script'
import { useParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { Avatar, DatePicker, Form, Input, Modal, Select } from 'antd'

import { fetchMembers } from 'pages/members/queries'
import { insertEvent } from 'utils/calendar'
import { fetchCandidate } from 'pages/candidate/queries'

type ScheduleModalProps = {
  isModalOpen: boolean
  onCancel: () => void
}

export default function ScheduleModal({
  isModalOpen,
  onCancel,
}: ScheduleModalProps) {
  const [form] = Form.useForm()
  const { candidateId = '' } = useParams()

  const [{ data: members }, { data: candidate }] = useQueries({
    queries: [
      { queryKey: ['members'], queryFn: fetchMembers },
      {
        queryKey: ['candidates', candidateId],
        queryFn: () => fetchCandidate(candidateId),
      },
    ],
  })

  const membersList = useMemo(
    () =>
      members?.map(({ email, photoURL, displayName }) => ({
        value: email,
        label: (
          <div className="flex items-center space-x-2">
            <Avatar src={photoURL} size="small" className="flex-none">
              {displayName?.charAt(0)}
            </Avatar>
            <p className="truncate" title={displayName ?? ''}>
              {displayName}
            </p>
          </div>
        ),
      })) ?? [],
    [members],
  )

  function handleOk() {
    form.validateFields().then(async (values: any) => {
      const startTime = values.startTime.format()
      const endTime = values.endTime.format()

      const event: gapi.client.calendar.Event = {
        summary: values.summary,
        start: { dateTime: startTime },
        end: { dateTime: endTime },
        attendees: [
          ...values.interviewers.map((email: string) => ({ email })),
          { email: candidate?.email },
        ],
      }

      await insertEvent(event)

      onCancel()
    })
  }

  return (
    <Modal
      onOk={handleOk}
      open={isModalOpen}
      onCancel={onCancel}
      title="Schedule interview"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Interview Title"
          name="summary"
          className="flex-1"
          rules={[
            { required: true, message: 'Please enter interview title...' },
          ]}
        >
          <Input placeholder="Interview Title..." />
        </Form.Item>

        <div className="flex items-center w-full space-x-2">
          <Form.Item
            label="Start Time"
            name="startTime"
            className="flex-1"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker showTime={{ format: 'HH:mm' }} className="w-full" />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="End Time"
            className="flex-1"
            rules={[{ required: true, message: 'Please select end time' }]}
          >
            <DatePicker showTime={{ format: 'HH:mm' }} className="w-full" />
          </Form.Item>
        </div>

        <Form.Item
          label="Select Interviewers"
          name="interviewers"
          rules={[{ required: true, message: 'Please select interviewers' }]}
        >
          <Select
            showSearch
            mode="multiple"
            options={membersList}
            filterOption={(input, option) => {
              const member = members?.find(({ uid }) => uid === option?.value)
              if (member) {
                return !!member.displayName
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              } else {
                return false
              }
            }}
            placeholder="Select Interviewers"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
