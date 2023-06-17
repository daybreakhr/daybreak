import { useMemo, useState } from 'react'
import { orderBy } from 'lodash'
import { Button, Input } from 'antd'
import { matchSorter } from 'match-sorter'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Switch } from 'ui-kit'
import ToggleView from 'components/toggle-view'
import { fetchMembers } from 'pages/members/queries'
// import { ReactComponent as FilterIcon } from 'assets/icons/filter-icon.svg'
import { ReactComponent as UserArrowDown } from 'assets/icons/user-arrow-down.svg'

import JobCard from './components/job-card'
import JobList from './components/job-list'
import { createJob, fetchJobs } from './queries'

export default function AllJobs() {
  const navigate = useNavigate()
  //   const [, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [viewState, setViewState] = useState<'kanban' | 'table'>('kanban')
  const { data = [] } = useQuery(['jobs'], fetchJobs)
  const { data: members = [] } = useQuery(['members'], fetchMembers)

  const sortedJobs = useMemo(() => {
    const filteredJobs = data.filter(({ title }) => title)
    return orderBy(filteredJobs, 'createdAt', 'desc')
  }, [data])

  const filterJobsBySearch = matchSorter(sortedJobs, input, {
    keys: ['title'],
  })

  const { mutate, isLoading: isCreatingJob } = useMutation(createJob, {
    onSuccess: ({ id }) => {
      navigate(`/jobs/${id}/create/1`)
    },
  })

  return (
    <div className="flex flex-col h-screen px-12 py-6 overflow-hidden">
      <div className="flex items-center mb-10">
        <p className="text-2xl font-semibold">All Jobs</p>

        <div className="flex-1" />

        <Button
          type="primary"
          loading={isCreatingJob}
          icon={<UserArrowDown className="anticon" />}
          onClick={() => mutate()}
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
        {/* <Button icon={<FilterIcon />} onClick={() => setOpen(true)} /> */}
      </div>

      <Switch>
        <Switch.Match when={viewState === 'kanban'}>
          <div className="flex flex-col space-y-5">
            {filterJobsBySearch.map((job) => (
              <JobCard key={job.id} job={job} members={members} />
            ))}
          </div>
        </Switch.Match>

        <Switch.Match when={viewState === 'table'}>
          <JobList data={filterJobsBySearch} />
        </Switch.Match>
      </Switch>
    </div>
  )
}
