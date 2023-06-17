import dayjs from 'dayjs'
import { Tag } from 'antd'
import { capitalize, words } from 'lodash'
import { RxDotFilled } from 'react-icons/rx'
import { createColumnHelper } from '@tanstack/react-table'

import { Show } from 'ui-kit'
import { Job } from 'types/job'
import formatNumber from 'utils/format-number'

const columnHelper = createColumnHelper<Job>()

export const jobListColumns = [
  columnHelper.accessor('title', {
    header: 'Jobs',
    size: 300,
    cell: ({ row }) => {
      const job = row.original
      return (
        <div>
          <p className="mb-1">{job.title}</p>
          <p className="flex flex-wrap items-center text-xs text-gray-500">
            <span>{job.Location?.name}</span>
            <RxDotFilled />
            <span>
              {words(job.jobType ?? '')
                .map((val) => capitalize(val))
                .join(' ')}{' '}
              {job.isRemote ? '(Remote)' : null}
            </span>
            <RxDotFilled />
            <span>{job.experience}</span>
            <Show when={job.minSalary}>
              {(value) => (
                <>
                  <RxDotFilled />
                  {formatNumber(value)}
                </>
              )}
            </Show>{' '}
            <Show when={job.maxSalary}>
              {(value) => `- ${formatNumber(value)}`}
            </Show>
          </p>
        </div>
      )
    },
  }),
  columnHelper.accessor('Department.name', {
    header: 'Department',
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: ({ getValue }) => capitalize(getValue()),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created On',
    cell: ({ getValue }) => dayjs(getValue()).format('DD MMM YYYY'),
  }),
  columnHelper.accessor('isPublished', {
    header: 'Status',
    size: 60,
    cell: ({ getValue }) => {
      const isPublished = getValue()
      return (
        <Tag color={isPublished ? 'green' : 'default'}>
          {isPublished ? 'Published' : 'Draft'}
        </Tag>
      )
    },
  }),
]
