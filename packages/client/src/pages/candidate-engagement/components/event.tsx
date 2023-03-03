import { ClockCircleOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import dayjs from 'dayjs'
import { ReactElement } from 'react'

type Eventprops = {
  createdAt: Date
  scheduledAt: Date
  title: string
  icon: ReactElement
  details: ReactElement
}

export default function Event(eventProps: Eventprops) {
  const { createdAt, scheduledAt, title, icon, details } = eventProps
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center justify-center h-16 text-white rounded-md shadow w-14 bg-primary-main">
        <span className="text-lg">{dayjs(createdAt).format('DD')}</span>
        <b className="-mt-1 text-xs uppercase">
          {dayjs(createdAt).format('MMM')}
        </b>
      </div>

      <div className="flex flex-col justify-center flex-1">
        <div className="flex space-x-2 text-xs">
          {icon}
          <p className="text-base font-bold">{title}</p>
        </div>
        {details}
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Tag color="#FF781F" className="font-bold shadow-md">
          {dayjs(scheduledAt).format('DD MMM')}
        </Tag>
        <Tag
          icon={<ClockCircleOutlined />}
          color="green"
          className="text-black shadow-md"
        >
          {dayjs(scheduledAt).format('HH:mm')}
        </Tag>
      </div>
    </div>
  )
}
