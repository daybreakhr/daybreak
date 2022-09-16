import { useState } from 'react'
import { matchSorter } from 'match-sorter'
import { Button, Input, Table } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'
import { sampleData, candidateColumns } from './constants/candidate-list'

export default function Candidate() {
  const [input, setInput] = useState('')
  const filteredData = matchSorter(sampleData, input, {
    keys: ['candidatename'],
  })

  return (
    <div className="p-8">
      <div className="p-4 bg-white rounded-md shadow-md">
        <p className="font-medium font-sans text-xl">Candidate Listing</p>
        <div className="flex items-center mb-4 justify-between">
          <Input
            value={input}
            style={{ width: '26rem' }}
            prefix={<AiOutlineSearch />}
            placeholder="Search by Candidate Name..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="primary">Add Candidate</Button>
        </div>
        <Table dataSource={filteredData} columns={candidateColumns} />
      </div>
    </div>
  )
}
