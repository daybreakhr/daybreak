import { useState } from 'react'
import { matchSorter } from 'match-sorter'
import { Button, Input, Table } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'

import JobCard from './components/job-card'
import { cardDetails } from './constants/card-details'
import { sampleData, jobColumns } from './constants/job-list'

export default function Jobs() {
  const [input, setInput] = useState('')
  const filteredData = matchSorter(sampleData, input, {
    keys: ['jobrole'],
  })

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-4 mb-8">
        {cardDetails.map((card) => (
          <JobCard key={card.title} {...card} />
        ))}
      </div>

      <div className="p-4 bg-white rounded-md shadow-md">
        <p className="font-medium font-sans text-xl">Listed Jobs</p>
        <div className="flex items-center mb-4 justify-between">
          <Input
            value={input}
            style={{ width: '16rem' }}
            prefix={<AiOutlineSearch />}
            placeholder="Search by Job Role..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="primary">Create Job</Button>
        </div>

        <Table dataSource={filteredData} columns={jobColumns} />
      </div>
    </div>
  )
}
