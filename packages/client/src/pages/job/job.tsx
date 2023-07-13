import { useMemo, useState } from 'react'
import { groupBy, orderBy } from 'lodash'
import { matchSorter } from 'match-sorter'
import { useParams } from 'react-router-dom'
import { Candidate, CandidateStatus } from '@prisma/client'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Dropdown, Empty, Input, MenuProps, Spin } from 'antd'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'

import { Show, Switch } from 'ui-kit'
import CandidatePage from 'pages/candidate.new'
import ToggleView from 'components/toggle-view'
import RejectModal from 'components/reject-modal'
import useLocalStorage from 'hooks/use-local-storage'
import { getPipelineStages, getLastDate } from 'utils/utils'
import { fetchInterviews } from 'pages/create-pipeline/queries'
import { ReactComponent as TieImage } from 'assets/icons/tie-image.svg'
import { ReactComponent as UserArrowDown } from 'assets/icons/user-arrow-down.svg'
import { ReactComponent as MoveCandidateIcon } from 'assets/icons/move-candidate.svg'
import { ReactComponent as RejectCandidateIcon } from 'assets/icons/reject-candidate.svg'

import JobHeader from './components/job-header'
import StatusList from './components/status-list'
import CandidateList from './components/candidate-list'
import FilterPipeline from './components/filter-pipeline'
import { bulkUpdateCandidate, fetchCandidatesByJob, fetchJob } from './queries'
import CreateCandidate from './components/create-candidate'

export default function JobPipeline() {
  const { jobId = '' } = useParams()
  const [input, setInput] = useState('')
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [createCandiateDrawer, setCreateCandidateDrawer] = useState(false)
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
    { data: job },
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
      {
        queryKey: ['job', jobId],
        queryFn: () => fetchJob(jobId),
      },
    ],
  })

  const items: MenuProps['items'] = getPipelineStages(interviews)
    .slice(0, -1)
    .map(({ label, value }) => {
      return { key: value, label }
    })

  const queryClient = useQueryClient()
  const { mutate, mutateAsync, isLoading } = useMutation(bulkUpdateCandidate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['candidates', jobId])
      setSelectedCandidates([])
      setIsRejectModalOpen(false)
    },
  })

  async function handleBulkRejection(reasons: string[], notes: string) {
    const payload = selectedCandidates.map((id) => {
      const data = {
        status: CandidateStatus.rejected,
        rejectionReasons: reasons,
        rejectionNotes: notes,
      }
      return { id, data }
    })

    await mutateAsync(payload)
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

  const filteredCandidatesByDate =
    selectedDateFilter === 'all-time'
      ? filteredCandidatesBySearch
      : filteredCandidatesBySearch?.filter(
          ({ createdAt }) =>
            new Date(createdAt) >= getLastDate(selectedDateFilter),
        )

  const candidateByStatus = useMemo(() => {
    const result = {} as Record<string, Candidate[]>

    const groupByStatus = groupBy(
      filteredCandidatesByDate,
      (candidate) => candidate.status,
    )

    Object.entries(groupByStatus).forEach(([key, value]) => {
      if (key !== CandidateStatus.interview) {
        result[key] = value
      } else {
        const groupByInterview = groupBy(
          value,
          (candidate) => candidate.interviewId,
        )
        Object.entries(groupByInterview).forEach(([key, value]) => {
          result[key] = value
        })
      }
    })

    return result
  }, [filteredCandidatesByDate])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <JobHeader candidates={candidates} />
      <div className="flex items-center px-6 mb-4 space-x-4">
        <Show
          when={
            !isInterviewsLoading &&
            !isCandidatesLoading &&
            candidates?.length !== 0
          }
        >
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
        </Show>
      </div>

      <Switch>
        <Switch.Match when={isInterviewsLoading || isCandidatesLoading}>
          <div className="flex items-center justify-center flex-1">
            <Spin tip="Fetching Candidates..." />
          </div>
        </Switch.Match>

        <Switch.Match when={candidates?.length === 0}>
          <Empty
            image={<TieImage />}
            imageStyle={{ height: '20rem' }}
            description={
              <span className="text-base font-medium">
                Welcome to the Job Pipeline. <br />
                You have not imported/added any candidates yet.
              </span>
            }
          >
            <div className="flex justify-center">
              <Button
                type="primary"
                icon={<UserArrowDown className="anticon" />}
                onClick={() => setCreateCandidateDrawer(true)}
              >
                Add Candidate
              </Button>
            </div>
          </Empty>
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
                    candidates={candidateByStatus[value]}
                    selectedCandidates={selectedCandidates}
                    setSelectedCandidates={setSelectedCandidates}
                  />
                ))}
            </div>
          </Show>
        </Switch.Match>
      </Switch>

      <RejectModal
        isRejecting={isLoading}
        isOpen={isRejectModalOpen}
        onReject={handleBulkRejection}
        onClose={() => setIsRejectModalOpen(false)}
      />

      <CandidatePage />
      <CreateCandidate
        title={job?.title}
        isOpen={createCandiateDrawer}
        onClose={() => setCreateCandidateDrawer(false)}
      />
    </div>
  )
}
