import { useParams } from 'react-router-dom'
import { Show } from 'ui-kit'

import Stepper from './components/stepper'
import JobDetails from './containers/job-details'
import JobPipelines from './containers/job-pipelines'
import JobPublish from './containers/job-publish'

export default function CreateJob() {
  const params = useParams()
  const step = params.step ? +params.step : 0

  return (
    <div className="flex flex-col h-full py-12 overflow-scroll bg-white">
      <div className="w-full max-w-4xl mx-auto ">
        <Show when={!!step}>
          <Stepper currentStep={step} />
          <Show when={step === 1}>
            <JobDetails />
          </Show>
          <Show when={step === 2}>
            <JobPipelines />
          </Show>
          <Show when={step === 3}>
            <JobPublish />
          </Show>
        </Show>
      </div>
    </div>
  )
}
