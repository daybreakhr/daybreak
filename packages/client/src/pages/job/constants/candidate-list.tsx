import dayjs from 'dayjs'
import { Tag } from 'antd'
import { capitalize } from 'lodash'
import type { Candidate, CandidateSource } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table'

import { Show } from 'ui-kit'
import { candidateSources } from '../constants/icons'

const columnHelper = createColumnHelper<Candidate>()

export const candidateListColumns = [
  columnHelper.accessor('source', {
    header: 'Source',
    size: 50,
    cell: ({ getValue }) => {
      const source = getValue() as CandidateSource
      const { color, icon } = candidateSources(source)
      return (
        <td>
          <span className="flex items-center justify-center">
            <Tag className="flex py-1 border-none" color={color}>
              {icon}
            </Tag>
          </span>
        </td>
      )
    },
  }),
  columnHelper.accessor('firstName', {
    header: 'Candidate Name',
    cell: ({ row }) => {
      const { firstName, middleName, lastName } = row.original
      return `${firstName} ${middleName ?? ''} ${lastName}`
    },
  }),
  columnHelper.accessor('currentCompany', {
    header: 'Current Company',
    cell: ({ getValue }) => (
      <Show when={getValue()} fallback="N/A">
        {(value) => value}
      </Show>
    ),
  }),
  columnHelper.accessor('totalYearsOfExperience', {
    header: 'Experience',
    cell: ({ getValue }) => (
      <Show when={getValue()} fallback="N/A">
        {(value) => `${value} years`}
      </Show>
    ),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Applied on',
    cell: ({ getValue }) => dayjs(getValue()).format('DD MMM YYYY'),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue()
      return <Tag>{capitalize(status)}</Tag>
    },
  }),
]
