import { Steps } from 'antd'

type StepperProps = {
  currentStep: number
}

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <Steps
        current={currentStep - 1}
        type="navigation"
        className="site-navigation-steps"
        items={[
          { title: 'Details', status: 'process' },
          { title: 'Pipeline', status: currentStep >= 2 ? 'process' : 'wait' },
          { title: 'Publish', status: currentStep >= 3 ? 'process' : 'wait' },
        ]}
      />
    </div>
  )
}
