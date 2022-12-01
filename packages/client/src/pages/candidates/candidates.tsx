import { useMemo, useState } from 'react'
import { Input, Table } from 'antd'
import type { Job } from '@prisma/client'
import { matchSorter } from 'match-sorter'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineSearch } from 'react-icons/ai'

import { fetchCandidates } from 'pages/candidates/queries'
import { candidateColumns } from 'pages/candidates/constants/candidate-list'

export default function Candidates() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const { data, isLoading } = useQuery(['candidates'], fetchCandidates)

  const filteredData = matchSorter(data ?? [], input, {
    keys: ['firstName', 'middleName', 'lastName'],
  })

  const appliedFor = useMemo(() => {
    if (data) {
      return data
        .map(({ Job }) => Job)
        .filter(
          (value, index, arr) =>
            value !== null &&
            arr.findIndex((val) => val?.id === value.id) === index,
        ) as Job[]
    }
    return [] as Job[]
  }, [data])

  return (
    <div className="p-8">
      <div className="p-4 bg-white rounded-md shadow-md">
        <p className="mb-4 font-sans text-xl font-medium">Candidates</p>
        <div className="flex items-center justify-between mb-4">
          <Input
            value={input}
            style={{ width: '16rem' }}
            prefix={<AiOutlineSearch />}
            placeholder="Search by Candidate Name..."
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <Table
          loading={isLoading}
          dataSource={filteredData}
          rowKey={(record) => record.id}
          columns={candidateColumns(appliedFor)}
          onRow={(record) => ({
            className: 'cursor-pointer',
            onClick: () => navigate(`${record.id}`),
          })}
        />
      </div>
    </div>
  )
}
