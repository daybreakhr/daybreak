import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import {
  Avatar,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  TimePicker,
} from 'antd'

import { fetchMembers } from 'pages/members/queries'
import { fetchCandidate } from 'pages/candidate/queries'
import dayjs from 'dayjs'
import { createCalendarEvent } from '../queries'

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

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(createCalendarEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(['calendars', candidateId])
      onCancel()
    },
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

  const disabledTime = () => {
    const selectedDate = form.getFieldValue('date')
    const isToday = selectedDate && dayjs(selectedDate).isSame(dayjs(), 'day')

    const range = (start: number, end: number) => {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    }

    return {
      disabledHours: () => (isToday ? range(0, dayjs().hour()) : []),
      disabledMinutes: (selectedHour: number) =>
        isToday && selectedHour === dayjs().hour()
          ? range(0, dayjs().minute())
          : [],
    }
  }

  function handleOk() {
    form.validateFields().then((values: any) => {
      const sTime = values.startTime.format('HH:mm:ss')
      const eTime = values.endTime.format('HH:mm:ss')
      const date = values.date.format('YYYY-MM-DD')

      const startTime = dayjs(`${date} ${sTime}`).toDate()
      const endTime = dayjs(`${date} ${eTime}`).toDate()

      mutate({
        candidateId,
        body: {
          title: values.summary,
          attendees: [...values.interviewers, candidate?.email],
          startTime,
          endTime,
        },
      })
    })
  }

  return (
    <Modal
      width={720}
      onOk={handleOk}
      open={isModalOpen}
      onCancel={onCancel}
      title="Schedule interview"
      okButtonProps={{ loading: isLoading }}
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
            label="Interview Date"
            name="date"
            className="flex-1"
            rules={[{ required: true, message: 'Please select date' }]}
          >
            <DatePicker
              format="DD-MM-YYYY"
              className="w-full"
              disabledDate={(current) =>
                current.isBefore(dayjs().subtract(1, 'day'))
              }
            />
          </Form.Item>
          <Form.Item
            label="Start Time"
            name="startTime"
            className="flex-1"
            rules={[{ required: true, message: 'Please select start time' }]}
          >
            <TimePicker
              format="HH:mm"
              disabledTime={disabledTime}
              className="w-full"
              onChange={(val) =>
                val && form.setFieldValue('endTime', val.add(1, 'hours'))
              }
            />
          </Form.Item>

          <Form.Item
            name="endTime"
            label="End Time"
            className="flex-1"
            rules={[
              {
                required: true,
                message: 'Please select end time',
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              disabledTime={disabledTime}
              className="w-full"
            />
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
