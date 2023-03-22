import { groupBy } from 'lodash'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchInterviews } from 'pages/create-pipeline/queries'
import { Show } from 'ui-kit'
import StatusList from './components/status-list'
import { fetchCandidatesByJob } from './queries'

export default function JobPipeline() {
  const { jobId = '' } = useParams()

  const { data, isLoading } = useQuery(['candidates', jobId], () =>
    fetchCandidatesByJob(jobId),
  )

  const { data: interviews, isLoading: isLoadingInterviews } = useQuery(
    ['interviews', jobId],
    () => fetchInterviews(jobId),
  )

  fetchInterviews
  const groupByStatus = groupBy(data ?? [], (candidate) => candidate.status)

  return (
    <div className="flex flex-1 gap-6 p-8 overflow-x-auto">
      <Show when={!isLoadingInterviews}>
        {interviews?.map(({ title, id }) => (
          <StatusList
            key={id}
            title={title}
            className="border-t-amber-500"
            isLoading={isLoading}
            candidates={groupByStatus[title]}
          />
        ))}
      </Show>
    </div>
  )
}
