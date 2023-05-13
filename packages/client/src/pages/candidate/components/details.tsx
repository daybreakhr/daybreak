import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CandidateStatus } from '@prisma/client'
import { useClipboard } from 'use-clipboard-copy'
import { Button, message, Select, Tooltip } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  AiFillLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from 'react-icons/ai'
import { Show } from 'ui-kit'
import { Candidate } from 'types/candidate'
import { candidateStatusOptions, getJobType } from 'utils/utils'
import { updateCandidate } from '../queries'
import CandidateRejectForm from './candidate-reject-form'
import ReEnrollConfirmation from './re-enroll-confirmation'

type DetailsProps = {
  data: Candidate | undefined
}

export default function Details({ data }: DetailsProps) {
  const queryClient = useQueryClient()
  const { candidateId = '' } = useParams()
  const [candidateRejectForm, setCandidateRejectForm] = useState(false)
  const [candidateReEnrollConfirmation, setReEnrollConfirmation] =
    useState(false)

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

  const options = useMemo(() => {
    return [
      ...candidateStatusOptions.slice(0, 2),
      ...(data?.Job.Interview.map(({ id, title }) => {
        return { label: title, value: id }
      }) ?? []),
      ...candidateStatusOptions.slice(2),
    ]
  }, [data])

  function handleStatusChange(value: string) {
    if (CandidateStatus[value as keyof typeof CandidateStatus]) {
      mutate({
        candidateId,
        body: { status: value as CandidateStatus, interviewId: null },
      })
    } else {
      mutate({
        candidateId,
        body: { status: CandidateStatus.interview, interviewId: value },
      })
    }
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

        <Show when={data?.linkedInUrl}>
          {(link) => (
            <Tooltip title="Visit LinkedIn Profile">
              <Button
                href={link}
                shape="circle"
                target="_blank"
                icon={<AiFillLinkedin />}
              />
            </Tooltip>
          )}
        </Show>
      </div>

      <hr className="w-full my-4 border-gray-300" />
      <Show when={data?.status !== CandidateStatus.rejected}>
        <div className="flex items-center space-x-4">
          <Button danger onClick={() => setCandidateRejectForm(true)}>
            Reject
          </Button>
          <CandidateRejectForm
            visible={candidateRejectForm}
            onCancel={() => setCandidateRejectForm(false)}
          />

          <Select
            options={options}
            value={data?.interviewId || data?.status}
            style={{ width: 180 }}
            onChange={handleStatusChange}
          />
        </div>
      </Show>
      <Show when={data?.status === CandidateStatus.rejected}>
        <div className="flex items-center space-x-4">
          <Button type="primary" onClick={() => setReEnrollConfirmation(true)}>
            Re-Enroll
          </Button>
          <ReEnrollConfirmation
            visible={candidateReEnrollConfirmation}
            onCancel={() => setReEnrollConfirmation(false)}
          />
        </div>
      </Show>
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
