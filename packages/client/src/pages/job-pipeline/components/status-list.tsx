import { range } from 'lodash'
import { Skeleton } from 'antd'
import { Switch } from 'ui-kit'
import { Candidate } from 'types/candidate'
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
    <div className="relative flex flex-col flex-none overflow-hidden w-80">
      <div className="px-2">
        <div className="sticky top-0 z-10 flex items-center py-2 mb-4 space-x-3">
          <p className="text-base font-medium">{title}</p>
          <p className="flex items-center justify-center w-5 h-5 text-gray-800 bg-gray-300 rounded-md">
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
              data.map((candidate) => {
                const { id, firstName, middleName, lastName } = candidate
                const name = `${firstName} ${middleName ?? ''} ${lastName}`

                return (
                  <a
                    key={id}
                    target="_blank"
                    rel="noreferrer"
                    href={`/candidates/${id}/profile`}
                  >
                    <CandidateCard
                      name={name}
                      createdAt={candidate.createdAt}
                      currentCompany={candidate.currentCompany}
                      totalYearsOfExperience={candidate.totalYearsOfExperience}
                    />
                  </a>
                )
              })
            }
          </Switch.Match>
        </Switch>
      </div>
    </div>
  )
}
