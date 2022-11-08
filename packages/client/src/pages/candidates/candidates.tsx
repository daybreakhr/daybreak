import { useState } from 'react'
import { Input, Table } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineSearch } from 'react-icons/ai'

import { fetchCandidate } from 'pages/candidates/queries'
import { candidateColumns } from 'pages/candidates/constants/candidate-list'
import { useNavigate } from 'react-router-dom'

export default function Candidates() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const { data, isLoading } = useQuery(['candidates'], fetchCandidate)

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
          dataSource={data}
          rowKey={(record) => record.id}
          columns={candidateColumns}
          onRow={(record) => ({
            className: 'cursor-pointer',
            onClick: () => navigate(`${record.id}`),
          })}
        />
      </div>
    </div>
  )
}
