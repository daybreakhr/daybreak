import { useState } from 'react'
import { groupBy } from 'lodash'
import { matchSorter } from 'match-sorter'
import { useParams } from 'react-router-dom'
import { MdViewKanban } from 'react-icons/md'
import { Button, Input, Radio, Spin } from 'antd'
import { useQueries } from '@tanstack/react-query'
import { SearchOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Show, Switch } from 'ui-kit'

import { getPipelineStages } from 'utils/utils'
import useLocalStorage from 'hooks/use-local-storage'
import { fetchInterviews } from 'pages/create-pipeline/queries'
import { ReactComponent as RejectCandidateIcon } from 'assets/icons/reject-candidate.svg'

import { fetchCandidatesByJob } from './queries'
import StatusList from './components/status-list'
import RejectModal from './components/reject-modal'
import CandidateList from './components/candidate-list'
import FilterPipeline from './components/filter-pipeline'

export default function JobPipeline() {
  const { jobId = '' } = useParams()
  const [input, setInput] = useState('')
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
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

  const viewTypes = [
    { label: <UnorderedListOutlined />, value: 'table' },
    {
      label: (
        <span className="text-lg anticon">
          <MdViewKanban />
        </span>
      ),
      value: 'kanban',
    },
  ]

  const filteredCandidates = matchSorter(candidates ?? [], input, {
    keys: ['firstName', 'middleName', 'lastName'],
  })
  const groupByStatus = groupBy(
    filteredCandidates,
    (candidate) => candidate.status,
  )

  return (
    <div className="flex flex-col flex-1 pt-4 overflow-hidden">
      <div className="flex items-center px-6 mb-4 space-x-4">
        <Radio.Group
          value={viewState}
          options={viewTypes}
          optionType="button"
          onChange={(e) => setViewState(e.target.value)}
        />
        <Input
          value={input}
          style={{ width: '16rem' }}
          suffix={<SearchOutlined />}
          placeholder="Search..."
          onChange={(e) => setInput(e.target.value)}
        />
        <FilterPipeline
          interviews={interviews}
          filteredStages={filteredStages}
          setFilteredStages={setFilteredStages}
        />
        <div className="flex-1" />
        <Show when={selectedCandidates.length > 0}>
          <Button
            danger
            onClick={() => setIsRejectModalOpen(true)}
            icon={<RejectCandidateIcon className="anticon" />}
          >
            Reject
          </Button>
        </Show>
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
            fallback={<CandidateList data={filteredCandidates} />}
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
        onClose={() => setIsRejectModalOpen(false)}
      />
    </div>
  )
}
