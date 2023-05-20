import { TeamOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Outlet, useParams } from 'react-router-dom'

import PageHeader from 'components/page-header'
import Details from './components/details'
import { fetchCandidate } from './queries'

export default function Candidate() {
  const { candidateId = '' } = useParams()

  const { data } = useQuery(['candidate', candidateId], () =>
    fetchCandidate(candidateId),
  )

  return (
    <>
      <PageHeader
        title="Candidate Profile"
        breadcrumb={[
          {
            label: 'Candidate List',
            path: '/candidates',
            icon: <TeamOutlined />,
          },
          { label: 'Candidate', path: `/candidates/${candidateId}` },
        ]}
        tabs={[
          { label: 'Profile', key: `/candidates/${candidateId}/profile` },
          { label: 'Resume', key: `/candidates/${candidateId}/resume` },
          { label: 'Feedback', key: `/candidates/${candidateId}/feedback` },
          { label: 'Engagement', key: `/candidates/${candidateId}/engagement` },
        ]}
      />

      <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
        <div className="flex flex-1 space-x-4">
          <div className="flex-1 overflow-hidden rounded-md">
            <Outlet />
          </div>

          <Details data={data} />
        </div>
      </div>
    </>
  )
}
