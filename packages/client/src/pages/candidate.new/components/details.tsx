import { Fragment } from 'react'
import { Button } from 'antd'
import { HiMail } from 'react-icons/hi'
import { LinkedinFilled } from '@ant-design/icons'
import { HiOutlineUserCircle, HiPhone } from 'react-icons/hi2'

import { Show } from 'ui-kit'

export default function Details() {
  const details = [
    { label: 'Experience', value: '4 years' },
    { label: 'Current Company', value: 'Daybreak' },
    { label: 'Source', value: 'LinkedIn' },
    { label: 'Location', value: 'Bangalore' },
  ]

  return (
    <div className="pt-6 pr-6 border-r">
      <div className="inline-flex items-center p-1 mb-4 text-2xl text-white bg-black rounded-full">
        <HiOutlineUserCircle />
      </div>
      <p className="text-base font-semibold">Tarun Luthra</p>
      <p className="mb-4 text-gray-500">Lead Data Analyst @Daybreak</p>

      <div className="flex items-center mb-6 space-x-2">
        <Button shape="circle">
          <HiPhone className="text-primary-500" />
        </Button>

        <Button shape="circle">
          <HiMail className="text-primary-500" />
        </Button>

        <Button shape="circle">
          <LinkedinFilled className="text-primary-500" />
        </Button>
      </div>

      <p className="font-medium">Candidate Details</p>

      <hr className="my-2" />
      {details.map(({ label, value }, index) => (
        <Fragment key={label}>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">{label}</p>
            <p>{value}</p>
          </div>

          <Show when={index < details.length - 1}>
            <hr className="my-2" />
          </Show>
        </Fragment>
      ))}
    </div>
  )
}
