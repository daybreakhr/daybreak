import { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { Candidate, CandidateSource } from '@prisma/client'
import { Show } from 'ui-kit'
import { Tag } from 'antd'
import { candidateListColumns } from '../constants/candidate-list'
import { candidateSources, getSourceTagColor } from '../constants/icons'

type CandidateListProps = {
  data: Candidate[]
}

function CellRenderer({ cell }: { cell: any }) {
  const source = cell.row.original.source
  const { sourceLabel, tagColor } = useMemo(() => {
    const label = candidateSources[source as CandidateSource] || 'Unknown'
    const color = getSourceTagColor(source as CandidateSource)
    return { sourceLabel: label, tagColor: color }
  }, [source])

  if (cell.column.id === 'firstName') {
    return (
      <td key={cell.id} className="px-4 py-3 font-normal">
        <span className="flex">
          <Tag className="py-1 border-none " color={tagColor}>
            {sourceLabel}
          </Tag>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </span>
      </td>
    )
  } else {
    return (
      <td key={cell.id} className="px-4 py-3 font-normal">
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    )
  }
}

export default function CandidateList({ data }: CandidateListProps) {
  const table = useReactTable({
    data,
    columns: candidateListColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex flex-1 mx-6 mb-4 overflow-hidden bg-white rounded-md shadow">
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="sticky top-0 z-10 px-4 py-3 text-xs font-medium text-left text-gray-600 bg-gray-50"
                  >
                    <Show when={!header.isPlaceholder}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Show>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-gray-50 border-y">
                {row.getVisibleCells().map((cell: any) => (
                  <CellRenderer key={cell.id} cell={cell} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
