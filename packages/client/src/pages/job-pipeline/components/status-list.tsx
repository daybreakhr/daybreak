import { Skeleton } from 'antd'
import { range } from 'lodash'
import { Link } from 'react-router-dom'
import { Candidate } from 'types/candidate'
import { Switch } from 'ui-kit'
import CandidateCard from './candidate-card'

type StatusListProps = {
  title: string
  isLoading: boolean
  candidates?: Candidate[]
}

export default function StatusList({
  title,
  isLoading,
  candidates,
}: StatusListProps) {
  return (
    <div className="flex-none w-72">
      <p className="mb-2 text-base font-medium text-gray-700">{title}</p>
      <div className="flex flex-col space-y-4">
        <Switch>
          <Switch.Match when={isLoading}>
            {range(3).map((val) => (
              <div key={val} className="w-full p-4 bg-white rounded-md">
                <Skeleton active avatar title paragraph={{ rows: 1 }} />
              </div>
            ))}
          </Switch.Match>

          <Switch.Match when={candidates}>
            {(data) =>
              data.map((candidate) => (
                <Link
                  to={`/candidates/${candidate.id}/profile`}
                  key={candidate.id}
                >
                  <CandidateCard
                    createdAt={candidate.createdAt}
                    feedbacks={candidate.Feedback}
                    name={`${candidate.firstName} ${
                      candidate.middleName ?? ''
                    } ${candidate.lastName}`}
                  />
                </Link>
              ))
            }
          </Switch.Match>
        </Switch>
      </div>
    </div>
  )
}
