import { useState } from 'react'
import { Button, Checkbox } from 'antd'
import { AiOutlineLeft, AiOutlineRocket } from 'react-icons/ai'
import Show from 'components/show'
import JobForm from './components/job-form'

export default function CreateJobs() {
  const [step, setStep] = useState(0)

  return (
    <div className="p-8">
      <div className="p-6 bg-white rounded-md shadow-md">
        <Show when={step === 0}>
          <p className="font-medium font-sans text-xl">Create Job</p>
          <JobForm onSubmit={() => setStep(1)} />
        </Show>

        <Show when={step === 1}>
          <p className="font-medium font-sans text-xl">Publish Job</p>
          <div className="grid grid-cols-3 gap-5 mb-6">
            <div className="flex items-start border border-gray-400 rounded p-4 space-x-3">
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
            <div className="border border-gray-400 rounded p-4" />
            <div className="border border-gray-400 rounded p-4" />
          </div>

          <div className="flex items-center justify-end space-x-3">
            <Button icon={<AiOutlineLeft />} onClick={() => setStep(0)}>
              Back
            </Button>

            <Button icon={<AiOutlineRocket />} type="primary">
              Publish
            </Button>
          </div>
        </Show>
      </div>
    </div>
  )
}
