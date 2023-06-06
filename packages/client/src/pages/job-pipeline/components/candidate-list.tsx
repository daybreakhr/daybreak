import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { Candidate } from '@prisma/client'

import { Show } from 'ui-kit'
import { candidateListColumns } from '../constants/candidate-list'

type CandidateListProps = {
  data: Candidate[]
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
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 font-normal">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
