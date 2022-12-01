import { useState } from 'react'
import { Breadcrumb, Tabs } from 'antd'
import { TeamOutlined } from '@ant-design/icons'
import { useQueries } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

import Profile from './components/profile'
import Details from './components/details'
import Feedback from './components/feedback'
import { fetchCandidate, fetchParseResume } from './queries'
import { Candidate as TCandidate } from 'types/candidate'

export default function Candidate() {
  const { candidateId = '' } = useParams()
  const [affindaKey, setAffindaKey] = useState<string | undefined>()

  const [
    { data, isLoading: isCandidateLoading },
    { data: affindaData, isLoading: isAffindaLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['candidate', candidateId],
        queryFn: () => fetchCandidate(candidateId),
        onSuccess({ affindaId }: TCandidate) {
          setAffindaKey(affindaId)
        },
      },
      {
        queryKey: ['affinda', candidateId],
        queryFn: () => fetchParseResume(affindaKey),
        enabled: !!affindaKey,
      },
    ],
  })

  const isLoading = isCandidateLoading || isAffindaLoading

  return (
    <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item key="candidates">
          <Link to="/candidates" className="space-x-1">
            <TeamOutlined />
            <span>Candidate List</span>
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item key="candidate">
          <span>Candidate</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex flex-1 space-x-4">
        <div className="flex-1 overflow-hidden rounded-md">
          <Tabs
            items={[
              {
                label: 'Candidate Profile',
                key: 'profile',
                children: (
                  <Profile
                    data={data}
                    affinda={affindaData?.data}
                    isLoading={isLoading}
                  />
                ),
              },
              { label: 'Feedback', key: 'feedback', children: <Feedback /> },
            ]}
          />
        </div>

        <Details data={data} />
      </div>
    </div>
  )
}
