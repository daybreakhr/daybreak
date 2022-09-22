import { useState } from 'react'
import { matchSorter } from 'match-sorter'
import { Button, Input, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'

import { jobColumns } from './constants/job-list'
import { createJob, fetchJobs } from './queries'

export default function Jobs() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  const { data, isLoading } = useQuery(['jobs'], fetchJobs)

  const { mutate, isLoading: isCreatingJob } = useMutation(createJob, {
    onSuccess: ({ id }) => {
      navigate(`/jobs/${id}/create`)
    },
  })

  const filteredData = matchSorter(data ?? [], input, {
    keys: ['title'],
  })

  return (
    <div className="p-8">
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

          <Button
            type="primary"
            loading={isCreatingJob}
            icon={<AiOutlinePlus />}
            onClick={() => mutate()}
          >
            Create Job
          </Button>
        </div>

        <Table
          loading={isLoading}
          columns={jobColumns}
          dataSource={filteredData}
        />
      </div>
    </div>
  )
}
