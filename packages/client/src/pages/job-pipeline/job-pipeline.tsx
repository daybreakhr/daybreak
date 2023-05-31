import { Spin } from 'antd'
import { groupBy } from 'lodash'
import { useParams } from 'react-router-dom'
import { useQueries } from '@tanstack/react-query'
import { Switch } from 'ui-kit'

import { getPipelineStages } from 'utils/utils'
import useLocalStorage from 'hooks/use-local-storage'
import { fetchInterviews } from 'pages/create-pipeline/queries'

import { fetchCandidatesByJob } from './queries'
import StatusList from './components/status-list'
import FilterPipeline from './components/filter-pipeline'

export default function JobPipeline() {
  const { jobId = '' } = useParams()
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

  const groupByStatus = groupBy(candidates, (candidate) => candidate.status)

  return (
    <div className="flex flex-col flex-1 pt-4 overflow-hidden">
      <div className="flex items-center justify-end px-6 mb-4 space-x-4">
        <FilterPipeline
          interviews={interviews}
          filteredStages={filteredStages}
          setFilteredStages={setFilteredStages}
        />
      </div>

      <div className="flex flex-1 gap-3 px-6 overflow-x-auto">
        <Switch>
          <Switch.Match when={isInterviewsLoading || isCandidatesLoading}>
            <div className="flex items-center justify-center flex-1">
              <Spin tip="Fetching Candidates..." />
            </div>
          </Switch.Match>

          <Switch.Match when={interviews}>
            {getPipelineStages(interviews)
              .filter(({ value }) => !filteredStages.includes(value))
              .map(({ label, value }) => (
                <StatusList
                  key={value}
                  title={label}
                  isLoading={isCandidatesLoading}
                  candidates={groupByStatus[value]}
                />
              ))}
          </Switch.Match>
        </Switch>
      </div>
    </div>
  )
}
