import { useMemo, useState } from 'react'
import { Button, Input } from 'antd'
import { orderBy, uniqBy } from 'lodash'
import { matchSorter } from 'match-sorter'
import { useNavigate } from 'react-router-dom'
import type { Department } from '@prisma/client'
import { SearchOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Switch } from 'ui-kit'
import ToggleView from 'components/toggle-view'
import { fetchMembers } from 'pages/members/queries'
import { ReactComponent as UserArrowDown } from 'assets/icons/user-arrow-down.svg'

import JobCard from './components/job-card'
import JobList from './components/job-list'
import { createJob, fetchJobs } from './queries'
import FilterJobs from './components/filter-jobs'

export default function AllJobs() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [filteredPriority, setFilteredPriority] = useState<string[]>([])
  const [filteredDepartment, setFilteredDepartment] = useState<string[]>([])
  const [viewState, setViewState] = useState<'kanban' | 'table'>('kanban')
  const [filteredStatus, setFilteredStatus] = useState<
    ('published' | 'draft')[]
  >([])

  const { data = [] } = useQuery(['jobs'], fetchJobs)
  const { data: members = [] } = useQuery(['members'], fetchMembers)

  const filterJobsBySearch = matchSorter(data, input, {
    keys: ['title'],
  })

  const sortedAndFilteredJobs = useMemo(() => {
    const filteredJobs = filterJobsBySearch.filter(({ title }) => title)
    const sortedJobs = orderBy(filteredJobs, 'createdAt', 'desc')
    const filterByPriority = sortedJobs.filter(
      ({ priority }) => !filteredPriority.includes(priority),
    )
    const filterByDepartment = filterByPriority.filter(
      ({ Department }) =>
        Department && !filteredDepartment.includes(Department.id),
    )
    const filterByStatus = filterByDepartment.filter(({ isPublished }) => {
      if (filteredStatus.includes('published') && isPublished) {
        return false
      } else if (filteredStatus.includes('draft') && !isPublished) {
        return false
      }
      return true
    })
    return filterByStatus
  }, [filterJobsBySearch, filteredPriority, filteredDepartment, filteredStatus])

  const { mutate, isLoading: isCreatingJob } = useMutation(createJob, {
    onSuccess: ({ id }) => {
      navigate(`/jobs/${id}/create/1`)
    },
  })

  const uniqueDepartments = useMemo(() => {
    const departments = data
      .filter((job) => job.Department)
      .map((job) => job.Department) as Department[]

    return uniqBy(departments, 'id').map(({ name, id }) => {
      return { label: name, value: id }
    })
  }, [data])

  return (
    <div className="flex flex-col h-screen px-12 py-6 overflow-hidden">
      <div className="flex items-center mb-10">
        <p className="text-2xl font-semibold">All Jobs</p>
        <div className="flex-1" />
        <Button
          type="primary"
          loading={isCreatingJob}
          onClick={() => mutate()}
          icon={<UserArrowDown className="anticon" />}
        >
          Create Job
        </Button>
      </div>

      <div className="flex items-center mb-6 space-x-4">
        <ToggleView viewType={viewState} onChange={setViewState} />
        <div className="flex-1" />
        <Input
          value={input}
          placeholder="Search..."
          style={{ width: '12rem' }}
          suffix={<SearchOutlined />}
          onChange={(e) => setInput(e.target.value)}
        />
        <FilterJobs
          departments={uniqueDepartments}
          filteredStatus={filteredStatus}
          filteredPriority={filteredPriority}
          setFilteredStatus={setFilteredStatus}
          filteredDepartment={filteredDepartment}
          setFilteredPriority={setFilteredPriority}
          setFilteredDepartment={setFilteredDepartment}
        />
      </div>

      <Switch>
        <Switch.Match when={viewState === 'kanban'}>
          <div className="flex flex-col space-y-5 overflow-y-auto">
            {sortedAndFilteredJobs.map((job) => (
              <JobCard key={job.id} job={job} members={members} />
            ))}
          </div>
        </Switch.Match>

        <Switch.Match when={viewState === 'table'}>
          <JobList data={sortedAndFilteredJobs} />
        </Switch.Match>
      </Switch>
    </div>
  )
}
