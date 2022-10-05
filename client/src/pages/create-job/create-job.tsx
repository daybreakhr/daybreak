import { useState } from 'react'
import { Button, Checkbox } from 'antd'
import {
  AiOutlineArrowLeft,
  AiOutlineLeft,
  AiOutlineRocket,
} from 'react-icons/ai'
import Show from 'components/show'
import JobForm from './components/job-form'
import { Link } from 'react-router-dom'

export default function CreateJobs() {
  const [step, setStep] = useState(0)

  return (
    <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
      <Link to="/jobs" className="flex items-center mb-4 space-x-2">
        <AiOutlineArrowLeft />
        <span>Jobs List</span>
      </Link>

      <div className="p-6 bg-white rounded-md shadow-md">
        <Show when={step === 0}>
          <p className="mb-4 font-sans text-xl font-medium">Create Job</p>
          <JobForm onSubmit={() => setStep(1)} />
        </Show>

        <Show when={step === 1}>
          <p className="mb-4 font-sans text-xl font-medium">Publish Job</p>
          <div className="grid grid-cols-3 gap-5 mb-6">
            <div className="flex items-start p-4 space-x-3 border border-gray-400 rounded">
              <div className="flex-none w-20 h-20 bg-gray-200 rounded-md" />
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
            <div className="p-4 border border-gray-400 rounded" />
            <div className="p-4 border border-gray-400 rounded" />
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
