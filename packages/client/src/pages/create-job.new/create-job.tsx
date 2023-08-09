import { Form } from 'antd'
import { useLocation } from 'react-router-dom'
import { Show } from 'ui-kit'

import Stepper from './components/stepper'
import JobDetails from './containers/job-details'
import JobPipelines from './containers/job-pipelines'
import JobPublish from './containers/job-publish'

export default function CreateJob() {
  const [form] = Form.useForm()
  const { pathname } = useLocation()
  const currentStep = parseInt(pathname.split('/')[3])

  return (
    <div className="flex flex-col h-full py-12 overflow-scroll bg-white">
      <Form layout="vertical" form={form} className="w-full max-w-4xl mx-auto ">
        <Show when={!Number.isNaN(currentStep)}>
          <Stepper currentStep={currentStep} />
          <Show when={currentStep === 1}>
            <JobDetails form={form} />
          </Show>
          <Show when={currentStep === 2}>
            <JobPipelines />
          </Show>
          <Show when={currentStep === 3}>
            <JobPublish />
          </Show>
        </Show>
      </Form>
    </div>
  )
}
