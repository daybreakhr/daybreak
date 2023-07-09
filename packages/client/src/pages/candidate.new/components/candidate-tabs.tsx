import { Tabs, TabsProps } from 'antd'

export default function CandidateTabs() {
  const items: TabsProps['items'] = [
    { key: 'profile', label: 'Profile' },
    { key: 'resume', label: 'Resume' },
    { key: 'comments', label: 'Comments' },
    { key: 'feedback', label: 'Feedback' },
    { key: 'Engagement', label: 'Engagement' },
  ]

  return (
    <div className="flex-1 border-r">
      <Tabs items={items} />
    </div>
  )
}
