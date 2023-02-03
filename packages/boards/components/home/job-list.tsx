import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import _ from 'lodash'
import { useState } from 'react'
import { getFilteredArray, getFilters, Job, JobFilterType } from 'utils/utils'
import JobCard from './job-card'

type JobListProps = {
  publishedJobs: Job[]
  workspaceSlug: string
  filters: JobFilterType
}

const JobList = ({ publishedJobs, workspaceSlug, filters }: JobListProps) => {
  const [input, setInput] = useState('')

  const filteredArray = getFilteredArray(
    publishedJobs,
    getFilters({ ...filters, title: input }),
  )

  const jobsByDepartment = Object.entries(
    _.groupBy(filteredArray, 'departmentId'),
  )

  return (
    <div className="flex flex-col flex-1 p-6 space-y-6 bg-white rounded-md">
      <Input
        placeholder="Search jobs..."
        prefix={<SearchOutlined />}
        allowClear
        onChange={(e) => setInput(e.target.value)}
      />
      <p className="text-2xl font-bold">{`${filteredArray.length} Job Opportunities`}</p>
      {jobsByDepartment.map(([departmentId, jobs]) => {
        const { name: departmentName } = jobs[0].Department
        return (
          <div key={departmentId} className="mb-4 space-y-4">
            <p className="px-4 text-xl font-medium">{departmentName}</p>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} workspaceSlug={workspaceSlug} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default JobList
