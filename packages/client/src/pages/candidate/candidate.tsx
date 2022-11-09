import { useState } from 'react'
import { Tabs } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import Profile from './components/profile'
import Details from './components/details'
import Feedback from './components/feedback'
import { fetchCandidate, fetchParseResume } from './queries'

export default function Candidate() {
  const { candidateId = '' } = useParams()
  const [activeKey, setActiveKey] = useState('profile')
  const [affindaKey, setAffindaKey] = useState<string | undefined>()

  const { data, isLoading } = useQuery(
    ['candidate', candidateId],
    () => fetchCandidate(candidateId),
    { onSuccess: ({ affindaId }) => setAffindaKey(affindaId) },
  )

  const { data: affindaData, isLoading: isAffindaLoading } = useQuery(
    ['affinda', candidateId],
    () => fetchParseResume(affindaKey),
    { enabled: !!affindaKey },
  )

  return (
    <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
      <Link to="/candidates" className="flex items-center mb-4 space-x-2">
        <AiOutlineArrowLeft />
        <span>All Candidates</span>
      </Link>

      <div className="flex flex-1 space-x-4">
        <div className="flex-1 overflow-hidden rounded-md">
          <Tabs
            activeKey={activeKey}
            onChange={(newKey) => setActiveKey(newKey)}
          >
            <Tabs.TabPane tab="Candidate Profile" key="profile">
              <Profile
                data={data}
                isLoading={isLoading}
                onChange={() => setActiveKey('feedback')}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Feedback" key="feedback">
              <Feedback />
            </Tabs.TabPane>
          </Tabs>
        </div>

        <Details data={data} isLoading={isLoading} />
      </div>
    </div>
  )
}
