import { useState } from 'react'
import { Tabs } from 'antd'
import { useParams } from 'react-router-dom'
import { TeamOutlined } from '@ant-design/icons'
import { useQueries } from '@tanstack/react-query'

import PageHeader from 'components/page-header'
import { Candidate as TCandidate } from 'types/candidate'
import Profile from './components/profile'
import Details from './components/details'
import Feedback from './components/feedback'
import { fetchCandidate, fetchParseResume } from './queries'

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
      />

      <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
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
    </>
  )
}
