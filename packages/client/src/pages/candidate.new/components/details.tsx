import { Fragment } from 'react'
import { Button } from 'antd'
import { HiMail } from 'react-icons/hi'
import { LinkedinFilled } from '@ant-design/icons'
import { HiOutlineUserCircle, HiPhone } from 'react-icons/hi2'

import { Show } from 'ui-kit'
import { Candidate } from 'types/candidate'

type DetailsProps = {
  candidate: Candidate | undefined
}

export default function Details({ candidate }: DetailsProps) {
  const currentCompany = candidate?.experience.find(
    ({ isCurrent }) => isCurrent,
  )

  const details = [
    {
      label: 'Total Experience',
      value: `${candidate?.totalYearsOfExperience} years`,
    },
    { label: 'Current Company', value: candidate?.currentCompany },
    { label: 'Source', value: candidate?.source },
    { label: 'Location', value: candidate?.location },
  ]

  return (
    <div className="flex-none w-56 pt-6 pr-6 border-r">
      <div className="inline-flex items-center p-1 mb-4 text-2xl text-white bg-black rounded-full">
        <HiOutlineUserCircle />
      </div>

      <Show
        when={candidate}
        fallback={
          <div className="w-24 h-6 mb-2 bg-gray-100 rounded animate-pulse" />
        }
      >
        {({ firstName, middleName, lastName }) => (
          <p className="text-base font-medium">
            {firstName} {middleName ?? ''} {lastName}
          </p>
        )}
      </Show>

      <Show when={currentCompany}>
        {({ company, designation }) => (
          <p className="mb-4 text-gray-500">
            {designation} @{company}
          </p>
        )}
      </Show>

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
