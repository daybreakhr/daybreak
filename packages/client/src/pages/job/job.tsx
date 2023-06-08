import { useState } from 'react'
import { groupBy } from 'lodash'
import { matchSorter } from 'match-sorter'
import { Button, Input, Spin } from 'antd'
import { useParams } from 'react-router-dom'
import { CandidateStatus } from '@prisma/client'
import { SearchOutlined } from '@ant-design/icons'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { Show, Switch } from 'ui-kit'

import { getPipelineStages } from 'utils/utils'
import RejectModal from 'components/reject-modal'
import useLocalStorage from 'hooks/use-local-storage'
import { fetchInterviews } from 'pages/create-pipeline/queries'
import { ReactComponent as RejectCandidateIcon } from 'assets/icons/reject-candidate.svg'

import JobHeader from './components/job-header'
import StatusList from './components/status-list'
import ToggleView from './components/toggle-view'
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

  const queryClient = useQueryClient()
  const { mutate } = useMutation(bulkUpdateCandidate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['candidates', jobId])
      setSelectedCandidates([])
      setIsRejectModalOpen(false)
    },
  })

  function handleBulkRejection(reasons: string[], notes: string) {
    if (selectedCandidates.length > 0) {
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
  }

  const filteredCandidatesBySource = selectedSources.length
    ? candidates?.filter(({ source }) => selectedSources.includes(source))
    : candidates

  const filteredCandidatesBySearch = matchSorter(
    filteredCandidatesBySource ?? [],
    input,
    { keys: ['firstName', 'middleName', 'lastName'] },
  )

  const groupByStatus = groupBy(
    filteredCandidatesBySearch,
    (candidate) => candidate.status,
  )

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <JobHeader />
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
            fallback={<CandidateList data={filteredCandidatesBySearch} />}
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
