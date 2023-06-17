import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { Show } from 'ui-kit'
import { Job } from 'types/job'

import { jobListColumns } from '../constants/job-list'

type JobListProps = {
  data: Job[]
}

export default function JobList({ data }: JobListProps) {
  const navigate = useNavigate()
  const table = useReactTable({
    data,
    columns: jobListColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex flex-1 mb-4 overflow-hidden bg-white rounded-md shadow">
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
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
              <tr
                key={row.id}
                className="border-b border-gray-100 cursor-pointer"
                onClick={() => navigate(`/jobs/${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 font-normal">
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
