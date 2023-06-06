import dayjs from 'dayjs'
import { Tag } from 'antd'
import { capitalize } from 'lodash'
import type { Candidate, CandidateSource } from '@prisma/client'
import { createColumnHelper } from '@tanstack/react-table'

import { Show } from 'ui-kit'
import { candidateSources, getSourceTagColor } from '../constants/icons'

const columnHelper = createColumnHelper<Candidate>()

export const candidateListColumns = [
  columnHelper.accessor('source', {
    header: 'Source',
    cell: ({ row }) => {
      const source = (row.original as any).source as CandidateSource
      const sourceLabel =
        candidateSources[source as CandidateSource] || 'Unknown'
      const tagColor = getSourceTagColor(source as CandidateSource)
      return (
        <td>
          <span className="flex">
            <Tag className="py-1 border-none" color={tagColor}>
              {sourceLabel}
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
