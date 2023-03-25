import clsx from 'clsx'
import { range } from 'lodash'
import { Skeleton } from 'antd'
import { Switch } from 'ui-kit'
import { Candidate } from 'types/candidate'
import CandidateCard from './candidate-card'

type StatusListProps = {
  title: string
  className: string
  isLoading: boolean
  candidates?: Candidate[]
}

export default function StatusList({
  title,
  className,
  isLoading,
  candidates,
}: StatusListProps) {
  return (
    <div className="relative flex flex-col flex-none overflow-hidden w-80">
      <div className="px-2">
        <div
          className={clsx(
            'flex items-center justify-between px-4 py-2 mb-4 bg-white rounded-md shadow border-b-white border-y-4 sticky top-0 z-10',
            className,
          )}
        >
          <p className="text-base font-medium text-gray-700">{title}</p>
          <p className="flex items-center justify-center w-6 h-6 p-1 text-gray-100 bg-gray-500 rounded">
            <span>{candidates?.length ?? 0}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col px-2 pb-4 space-y-4 overflow-y-auto">
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
                <a
                  target="_blank"
                  rel="noreferrer"
                  key={candidate.id}
                  href={`/candidates/${candidate.id}/profile`}
                >
                  <CandidateCard
                    createdAt={candidate.createdAt}
                    feedbacks={candidate.Feedback}
                    name={`${candidate.firstName} ${
                      candidate.middleName ?? ''
                    } ${candidate.lastName}`}
                  />
                </a>
              ))
            }
          </Switch.Match>
        </Switch>
      </div>
    </div>
  )
}
