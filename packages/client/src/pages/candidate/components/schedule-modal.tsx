import { useMemo } from 'react'
import dayjs from 'dayjs'
import { useParams, useSearchParams } from 'react-router-dom'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { Avatar, DatePicker, Form, Modal, Select, TimePicker } from 'antd'

import { fetchMembers } from 'pages/members/queries'
import { fetchInterviews } from 'pages/create-job/queries'

import { createCalendarEvent, fetchCandidate } from '../queries'

type ScheduleModalProps = {
  isModalOpen: boolean
  onCancel: () => void
}

export default function ScheduleModal({
  isModalOpen,
  onCancel,
}: ScheduleModalProps) {
  const [form] = Form.useForm()
  const { jobId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') ?? ''

  const [{ data: members }, { data: candidate }, { data: interviews }] =
    useQueries({
      queries: [
        { queryKey: ['members'], queryFn: fetchMembers },
        {
          queryKey: ['candidate', candidateId],
          queryFn: () => fetchCandidate(candidateId),
          enabled: !!candidateId,
        },
        {
          queryKey: ['interviews', jobId],
          queryFn: () => fetchInterviews(jobId),
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
        title: values.summary,
        attendees: [...values.interviewers, candidate?.email],
        startTime,
        endTime,
        candidateId,
      })
    })
  }

  return (
    <Modal
      width={640}
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
          <Select
            placeholder="Select an interview round"
            options={interviews?.map(({ title }) => {
              return { label: title, value: title }
            })}
          />
          {/* <Input placeholder="Interview Title..." /> */}
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
            className="w-32"
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
            className="w-32"
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
