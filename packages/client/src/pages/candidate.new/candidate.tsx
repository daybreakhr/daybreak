import { Drawer } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import Details from './components/details'
import Actions from './components/actions'
import CandidateTabs from './components/candidate-tabs'
import { fetchCandidate } from './queries'

export default function Candidate() {
  const [searchParams, setSearchParams] = useSearchParams()
  const candidateId = searchParams.get('candidateId') ?? ''

  const { data } = useQuery(
    ['candidate', candidateId],
    () => fetchCandidate(candidateId),
    { enabled: !!candidateId },
  )

  function handleClose() {
    setSearchParams({})
  }

  return (
    <Drawer
      height="85%"
      closable={false}
      onClose={handleClose}
      placement="bottom"
      className="rounded-t-lg"
      bodyStyle={{ padding: 0 }}
      open={!!candidateId}
    >
      <div className="flex h-full max-w-6xl mx-auto">
        <Details candidate={data} />
        <CandidateTabs />
        <Actions />
      </div>
    </Drawer>
  )
}
