import { capitalize } from 'lodash'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import formatNumber from 'utils/format-number'
import { fetchJob } from '../queries'

export default function JobHeader() {
  const { jobId = '' } = useParams()

  const { data } = useQuery(['job', jobId], () => fetchJob(jobId))

  return (
    <div className="px-6 py-4 mb-4 bg-white shadow-lg">
      <p className="mb-2 text-xl font-semibold">{data?.title}</p>
      <div className="space-x-4 text-gray-700">
        <span>{data?.experience}</span>
        <span>
          {formatNumber(data?.minSalary ?? 0)} -{' '}
          {formatNumber(data?.maxSalary ?? 0)}
        </span>
        <span>{data?.Location?.name}</span>
        <span>{capitalize(data?.priority)}</span>
      </div>
    </div>
  )
}
