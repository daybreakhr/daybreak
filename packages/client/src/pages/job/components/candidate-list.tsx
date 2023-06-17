import { Dispatch, SetStateAction } from 'react'
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
  selectedCandidates: string[]
  setSelectedCandidates: Dispatch<SetStateAction<string[]>>
}

export default function CandidateList({
  data,
  selectedCandidates,
  setSelectedCandidates,
}: CandidateListProps) {
  const isChecked = data?.every(({ id }) => selectedCandidates.includes(id))

  function handleSelectAll() {
    const listCandidateIds = data?.map(({ id }) => id) ?? []
    if (isChecked) {
      setSelectedCandidates((prev) =>
        prev.filter((id) => !listCandidateIds.includes(id)),
      )
    } else {
      setSelectedCandidates((prev) => [
        ...prev,
        ...(data?.map(({ id }) => id) ?? []),
      ])
    }
  }

  function handleCandidateSelect(id: string) {
    setSelectedCandidates((prev) => {
      if (prev.includes(id)) {
        return prev.filter((candidateId) => candidateId !== id)
      }
      return [...prev, id]
    })
  }

  const table = useReactTable({
    data,
    columns: candidateListColumns({
      isChecked,
      selectedCandidates,
      handleCandidateSelect,
      handleSelectAll,
    }),
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
              <tr key={row.id} className="border-b border-gray-50">
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
