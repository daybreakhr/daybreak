import { useState } from 'react'
import { Button, Checkbox, Steps } from 'antd'
import { AiOutlineLeft, AiOutlineRocket } from 'react-icons/ai'
import Show from 'components/show'
import JobForm from './components/job-form'

export default function CreateJobs() {
  const [step, setStep] = useState(0)

  return (
    <div className="p-8">
      <div className="p-6 bg-white rounded-md shadow-md">
        <div className="max-w-xl mx-auto">
          <Steps current={step}>
            <Steps.Step title="Create Job" />
            <Steps.Step title="Publish Job" />
          </Steps>
        </div>
        <hr className="my-8" />

        <Show when={step === 0}>
          <JobForm onSubmit={() => setStep(1)} />
        </Show>

        <Show when={step === 1}>
          <div className="grid grid-cols-3 gap-5 mb-6">
            <div className="border border-gray-400 rounded p-4">
              <div className="flex items-center space-x-3">
                <div className="w-20 h-20 bg-gray-200 rounded-md flex-none" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="mb-0">Careers Portal</p>
                    <Checkbox defaultChecked={true} />
                  </div>
                  <p className="text-xs text-gray-400">
                    Publish on your company career portal managed by Daybreak
                  </p>
                </div>
              </div>
            </div>
            <div className="border border-gray-400 rounded p-4" />
            <div className="border border-gray-400 rounded p-4" />
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button onClick={() => setStep(0)}>
              <AiOutlineLeft className="mr-1 text-lg" />
              <span>Back</span>
            </Button>

            <Button type="primary">
              <AiOutlineRocket className="mr-1 text-lg" />
              <span>Publish</span>
            </Button>
          </div>
        </Show>
      </div>
    </div>
  )
}
