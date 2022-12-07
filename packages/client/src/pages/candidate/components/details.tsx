import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { CandidateStatus } from '@prisma/client'
import { useClipboard } from 'use-clipboard-copy'
import { Button, message, Modal, Select, Tooltip } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  AiFillLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from 'react-icons/ai'

import { Candidate } from 'types/candidate'
import { Show } from 'ui-kit'
import { getJobType } from 'utils/utils'
import { updateCandidate } from '../queries'
import { candidateStatusOptions } from '../constants/candidate-status'

type DetailsProps = {
  data: Candidate | undefined
}

export default function Details({ data }: DetailsProps) {
  const queryClient = useQueryClient()
  const { candidateId = '' } = useParams()

  const { mutate } = useMutation(updateCandidate, {
    onSuccess: ({ status }) => {
      if (status === CandidateStatus.rejected) {
        message.info('This job application is rejected!')
      } else {
        message.info('The status has been successfully updated!')
      }

      queryClient.invalidateQueries(['candidate', candidateId])
      queryClient.invalidateQueries(['candidates'])
    },
  })

  const { copy: copyEmail, copied: isEmailCopied } = useClipboard({
    copiedTimeout: 3000,
  })
  const { copy: copyPhone, copied: isPhoneCopied } = useClipboard({
    copiedTimeout: 3000,
  })

  function handleReject() {
    Modal.warning({
      title: 'Reject Candidate?',
      content: 'Are you sure reject this candidate for the applied job?',
      okText: 'Confirm',
      onOk: () =>
        mutate({ candidateId, body: { status: CandidateStatus.rejected } }),
    })
  }

  return (
    <div className="flex flex-col items-center flex-none py-6 bg-white rounded-md shadow-md w-80 h-fit">
      <div className="flex items-center justify-center p-3 mb-4 bg-gray-400 rounded-full text-gray-50">
        <AiOutlineUser className="text-6xl" />
      </div>

      <Show
        when={data}
        fallback={
          <div className="w-20 h-6 mb-2 bg-gray-100 rounded animate-pulse" />
        }
      >
        {({ firstName, middleName, lastName }) => (
          <p className="mb-2 text-base font-medium">
            {firstName} {middleName ?? ''} {lastName}
          </p>
        )}
      </Show>

      <div className="flex items-center mb-4 space-x-2 text-xs text-gray-600">
        <p>Applied on:</p>
        <Show
          when={data?.createdAt}
          fallback={
            <div className="w-16 h-5 bg-gray-100 rounded animate-pulse" />
          }
        >
          {(date) => <span>{dayjs(date).format('MMMM D, YYYY')}</span>}
        </Show>
      </div>

      <div className="flex items-center justify-center space-x-6">
        <Tooltip
          title={
            isEmailCopied
              ? 'Email copied to clipboard!'
              : 'Click to copy email address'
          }
        >
          <Button
            shape="circle"
            disabled={!data?.email}
            icon={<AiOutlineMail />}
            onClick={() => copyEmail(data?.email)}
          />
        </Tooltip>

        <Tooltip
          title={
            isPhoneCopied
              ? 'Phone copied to clipboard!'
              : 'Click to copy phone number'
          }
        >
          <Button
            shape="circle"
            disabled={!data?.phone}
            icon={<AiOutlinePhone />}
            onClick={() => copyPhone(data?.phone)}
          />
        </Tooltip>

        <Tooltip title="Visit LinkedIn Profile">
          <Button
            shape="circle"
            target="_blank"
            href={data?.linkedInUrl}
            icon={<AiFillLinkedin />}
            disabled={!data?.linkedInUrl}
          />
        </Tooltip>
      </div>

      <hr className="w-full my-4 border-gray-300" />

      <div className="flex items-center space-x-4">
        <Button danger onClick={handleReject}>
          Reject
        </Button>
        <Select
          value={data?.status}
          style={{ width: 120 }}
          options={candidateStatusOptions}
          onChange={(val) =>
            mutate({ candidateId, body: { status: CandidateStatus[val] } })
          }
        />
      </div>

      <hr className="w-full my-4 border-gray-300" />

      <div className="w-full px-4">
        <p className="mb-2 text-xs text-gray-500 uppercase">Applied Job</p>
        <div className="px-4 py-2 bg-gray-100 rounded-md">
          <p className="mb-1 font-medium">{data?.Job.title}</p>
          <p className="space-x-4 text-xs text-gray-500">
            <span>{getJobType(data?.Job.jobType)}</span>
            <span>{data?.location}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
