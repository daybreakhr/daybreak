import { useState } from 'react'
import { groupBy, orderBy } from 'lodash'
import { matchSorter } from 'match-sorter'
import { useParams } from 'react-router-dom'
import { CandidateStatus } from '@prisma/client'
import { Button, Dropdown, Input, MenuProps, Spin } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { Show, Switch } from 'ui-kit'

import { getPipelineStages } from 'utils/utils'
import ToggleView from 'components/toggle-view'
import RejectModal from 'components/reject-modal'
import useLocalStorage from 'hooks/use-local-storage'
import { fetchInterviews } from 'pages/create-pipeline/queries'
import { ReactComponent as RejectCandidateIcon } from 'assets/icons/reject-candidate.svg'
import { ReactComponent as MoveCandidateIcon } from 'assets/icons/move-candidate.svg'

import JobHeader from './components/job-header'
import StatusList from './components/status-list'
import CandidateList from './components/candidate-list'
import FilterPipeline from './components/filter-pipeline'
import { bulkUpdateCandidate, fetchCandidatesByJob } from './queries'

export default function JobPipeline() {
  const { jobId = '' } = useParams()
  const [input, setInput] = useState('')
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [viewState, setViewState] = useState<'kanban' | 'table'>('kanban')
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [filteredStages, setFilteredStages] = useLocalStorage<string[]>(
    `stage-${jobId}`,
    [],
  )
  const [selectedDateFilter, setSelectedDateFilter] =
    useState<string>('all-time')

  const [
    { data: candidates = [], isLoading: isCandidatesLoading },
    { data: interviews = [], isLoading: isInterviewsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['candidates', jobId],
        queryFn: () => fetchCandidatesByJob(jobId),
      },
      {
        queryKey: ['interviews', jobId],
        queryFn: () => fetchInterviews(jobId),
      },
    ],
  })

  const items: MenuProps['items'] = getPipelineStages(interviews)
    .slice(0, -1)
    .map(({ label, value }) => {
      return { key: value, label }
    })

  const queryClient = useQueryClient()
  const { mutate } = useMutation(bulkUpdateCandidate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['candidates', jobId])
      setSelectedCandidates([])
      setIsRejectModalOpen(false)
    },
  })

  function handleBulkRejection(reasons: string[], notes: string) {
    const payload = selectedCandidates.map((id) => {
      const data = {
        status: CandidateStatus.rejected,
        rejectionReasons: reasons,
        rejectionNotes: notes,
      }
      return { id, data }
    })

    mutate(payload)
  }

  const handleBulkStatusChange: MenuProps['onClick'] = ({ key }) => {
    const payload = selectedCandidates.map((id) => {
      const status = CandidateStatus[key as keyof typeof CandidateStatus]
      if (status) {
        return { id, data: { status } }
      } else {
        return {
          id,
          data: { interviewId: key, status: CandidateStatus.interview },
        }
      }
    })
    mutate(payload)
  }

  const filteredCandidatesBySource = selectedSources.length
    ? candidates?.filter(({ source }) => selectedSources.includes(source))
    : candidates

  const filteredCandidatesBySearch = matchSorter(
    filteredCandidatesBySource ?? [],
    input,
    { keys: ['firstName', 'middleName', 'lastName'] },
  )

  const filteredCandidatesByDate = filteredCandidatesBySearch.filter(
    (candidate) => {
      if (selectedDateFilter === 'all-time') {
        return true
      }

      const currentDate = new Date()
      const candidateDate = new Date(candidate.createdAt)

      if (selectedDateFilter === 'last-week') {
        const lastWeekDate = new Date()
        lastWeekDate.setDate(currentDate.getDate() - 7)
        return candidateDate >= lastWeekDate
      }

      if (selectedDateFilter === 'last-month') {
        const lastMonthDate = new Date()
        lastMonthDate.setMonth(currentDate.getMonth() - 1)
        return candidateDate >= lastMonthDate
      }

      if (selectedDateFilter === 'last-quarter') {
        const lastQuarterDate = new Date()
        lastQuarterDate.setMonth(currentDate.getMonth() - 3)
        return candidateDate >= lastQuarterDate
      }

      return true
    },
  )
  const groupByStatus = groupBy(
    filteredCandidatesByDate,
    (candidate) => candidate.status,
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <JobHeader candidates={candidates} />
      <div className="flex items-center px-6 mb-4 space-x-4">
        <ToggleView viewType={viewState} onChange={setViewState} />
        <Show when={selectedCandidates.length > 0}>
          <Button
            danger
            disabled={selectedCandidates.length === 0}
            onClick={() => setIsRejectModalOpen(true)}
            icon={<RejectCandidateIcon className="anticon" />}
          >
            Reject
          </Button>
          <Dropdown menu={{ items, onClick: handleBulkStatusChange }}>
            <Button icon={<MoveCandidateIcon className="anticon" />}>
              Move to
              <DownOutlined />
            </Button>
          </Dropdown>
        </Show>
        <div className="flex-1" />
        <Input
          value={input}
          placeholder="Search..."
          style={{ width: '12rem' }}
          suffix={<SearchOutlined />}
          onChange={(e) => setInput(e.target.value)}
        />
        <FilterPipeline
          interviews={interviews}
          filteredStages={filteredStages}
          selectedSources={selectedSources}
          setFilteredStages={setFilteredStages}
          setSelectedSources={setSelectedSources}
          selectedDateFilter={selectedDateFilter}
          setSelectedDateFilter={setSelectedDateFilter}
        />
      </div>

      <Switch>
        <Switch.Match when={isInterviewsLoading || isCandidatesLoading}>
          <div className="flex items-center justify-center flex-1">
            <Spin tip="Fetching Candidates..." />
          </div>
        </Switch.Match>

        <Switch.Match when={interviews}>
          <Show
            when={viewState === 'kanban'}
            fallback={
              <CandidateList
                data={orderBy(filteredCandidatesByDate, 'createdAt', 'desc')}
                selectedCandidates={selectedCandidates}
                setSelectedCandidates={setSelectedCandidates}
              />
            }
          >
            <div className="flex flex-1 gap-3 px-6 overflow-x-auto">
              {getPipelineStages(interviews)
                .filter(({ value }) => !filteredStages.includes(value))
                .map(({ label, value }) => (
                  <StatusList
                    key={value}
                    title={label}
                    candidates={groupByStatus[value]}
                    selectedCandidates={selectedCandidates}
                    setSelectedCandidates={setSelectedCandidates}
                  />
                ))}
            </div>
          </Show>
        </Switch.Match>
      </Switch>

      <RejectModal
        isOpen={isRejectModalOpen}
        onReject={handleBulkRejection}
        onClose={() => setIsRejectModalOpen(false)}
      />
    </div>
  )
}
