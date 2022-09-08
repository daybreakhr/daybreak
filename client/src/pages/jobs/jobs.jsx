import { useState } from 'react'
import { Button, Input, Table } from 'antd'
import { sampleData, jobColumns } from './job-list'
import { AiOutlineSearch } from 'react-icons/ai'
import { matchSorter } from 'match-sorter'

export default function Jobs() {
  const [input, setInput] = useState('')
  const filteredData = matchSorter(sampleData, input, {
    keys: ['jobrole'],
  })

  return (
    <div className="m-8 p-4 bg-white rounded-md shadow-md">
      <div className="font-medium font-sans text-xl pb-4">Search Filters</div>
      <div className="flex items-center mb-4 space-x-4">
        <Input
          value={input}
          style={{
            fontSize: '1.1rem',
            marginTop: '1rem',
            width: '30rem',
          }}
          prefix={<AiOutlineSearch />}
          placeholder="Search Job Role to search"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex-1" />
        <Button type="primary">Create Job</Button>
      </div>

      <Table dataSource={filteredData} columns={jobColumns} />
    </div>
  )
}
