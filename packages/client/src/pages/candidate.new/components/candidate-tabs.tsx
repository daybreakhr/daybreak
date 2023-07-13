import { useState } from 'react'
import { Tabs, TabsProps } from 'antd'

import { Switch } from 'ui-kit'
import { Candidate } from 'types/candidate'

import Resume from './resume'
import Profile from './profile'
import Comments from './comments'
import Feedback from './feedback'

type CandidateTabsProps = {
  isLoading: boolean
  candidate: Candidate | undefined
}

const items: TabsProps['items'] = [
  { key: 'profile', label: 'Profile' },
  { key: 'resume', label: 'Resume' },
  { key: 'comments', label: 'Comments' },
  { key: 'feedback', label: 'Feedback' },
  { key: 'Engagement', label: 'Engagement' },
]

export default function CandidateTabs({
  candidate,
  isLoading,
}: CandidateTabsProps) {
  const [activeKey, setActiveKey] = useState('profile')

  return (
    <div className="flex flex-col flex-1 border-x">
      <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
      <Switch>
        <Switch.Match when={activeKey === 'profile'}>
          <Profile isLoading={isLoading} candidate={candidate} />
        </Switch.Match>

        <Switch.Match when={activeKey === 'resume'}>
          <Resume isLoading={isLoading} resume={candidate?.resume} />
        </Switch.Match>

        <Switch.Match when={activeKey === 'comments'}>
          <Comments />
        </Switch.Match>

        <Switch.Match when={activeKey === 'feedback'}>
          <Feedback />
        </Switch.Match>
      </Switch>
    </div>
  )
}
