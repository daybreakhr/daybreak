import { useState } from 'react'
import { Input, Table } from 'antd'
import { matchSorter } from 'match-sorter'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { sampleData, candidateColumns } from './constants/candidate-list'

export default function Candidates() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const filteredData = matchSorter(sampleData, input, {
    keys: ['name'],
  })

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
          dataSource={filteredData}
          columns={candidateColumns}
          onRow={(record) => ({
            className: 'cursor-pointer',
            onClick: () => navigate(`${record.key}`),
          })}
        />
      </div>
    </div>
  )
}
