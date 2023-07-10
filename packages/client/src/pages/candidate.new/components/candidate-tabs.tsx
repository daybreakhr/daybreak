import { Tabs, TabsProps } from 'antd'

import { Candidate } from 'types/candidate'

import Resume from './resume'
import Profile from './profile'

type CandidateTabsProps = {
  isLoading: boolean
  candidate: Candidate | undefined
}

export default function CandidateTabs({
  candidate,
  isLoading,
}: CandidateTabsProps) {
  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
      children: <Profile isLoading={isLoading} candidate={candidate} />,
    },
    {
      key: 'resume',
      label: 'Resume',
      children: <Resume isLoading={isLoading} resume={candidate?.resume} />,
    },
    { key: 'comments', label: 'Comments' },
    { key: 'feedback', label: 'Feedback' },
    { key: 'Engagement', label: 'Engagement' },
  ]

  return (
    <div className="flex-1 border-r">
      <Tabs defaultActiveKey="profile" items={items} />
    </div>
  )
}
