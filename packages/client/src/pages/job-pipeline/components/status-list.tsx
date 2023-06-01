import { range } from 'lodash'
import { Checkbox, Skeleton } from 'antd'
import type { Candidate } from '@prisma/client'
import type { Dispatch, SetStateAction } from 'react'
import { Switch } from 'ui-kit'

import CandidateCard from './candidate-card'

type StatusListProps = {
  title: string
  isLoading: boolean
  candidates?: Candidate[]
  selectedCandidates: string[]
  setSelectedCandidates: Dispatch<SetStateAction<string[]>>
}

export default function StatusList({
  title,
  isLoading,
  candidates,
  selectedCandidates,
  setSelectedCandidates,
}: StatusListProps) {
  const isChecked = candidates?.every(({ id }) =>
    selectedCandidates.includes(id),
  )

  function handleSelectAll() {
    const listCandidateIds = candidates?.map(({ id }) => id) ?? []
    if (isChecked) {
      setSelectedCandidates((prev) =>
        prev.filter((id) => !listCandidateIds.includes(id)),
      )
    } else {
      setSelectedCandidates((prev) => [
        ...prev,
        ...(candidates?.map(({ id }) => id) ?? []),
      ])
    }
  }

  function handleCandidateSelect(id: string) {
    setSelectedCandidates((prev) => {
      if (prev.includes(id)) {
        return prev.filter((candidateId) => candidateId !== id)
      }
      return [...prev, id]
    })
  }

  return (
    <div className="relative flex flex-col flex-none overflow-hidden w-80">
      <div className="px-2">
        <div className="sticky top-0 z-10 flex items-center py-2 mb-4 space-x-2">
          <Checkbox checked={isChecked} onChange={handleSelectAll} />
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
                      isChecked={selectedCandidates.includes(id)}
                      onCandidateSelect={() => handleCandidateSelect(id)}
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
