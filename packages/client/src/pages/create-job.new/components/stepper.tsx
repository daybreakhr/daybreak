import { Steps } from 'antd'

export default function Stepper() {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <Steps
        current={0}
        type="navigation"
        className="site-navigation-steps"
        items={[
          { title: 'Details', status: 'process' },
          { title: 'Pipeline', status: 'wait' },
          { title: 'Publish', status: 'wait' },
        ]}
      />
    </div>
  )
}
