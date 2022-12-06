import { range } from 'lodash'
import CandidateCard from './candidate-card'

type StatusListProps = {
  title: string
  length: number
}

export default function StatusList({ title, length }: StatusListProps) {
  return (
    <div className="flex-none w-72">
      <p className="mb-2 text-base font-medium text-gray-700">{title}</p>
      <div className="space-y-4">
        {range(length).map((val) => (
          <CandidateCard key={val} />
        ))}
      </div>
    </div>
  )
}
