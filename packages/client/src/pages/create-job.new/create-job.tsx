import { Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { Show } from 'ui-kit'
import { useMutation } from '@tanstack/react-query'

import Stepper from './components/stepper'
import JobDetails from './containers/job-details'
import JobPipelines from './containers/job-pipelines'
import JobPublish from './containers/job-publish'
import { createJob } from './queries'

export default function CreateJob() {
  const navigate = useNavigate()
  const params = useParams()
  const step = params.step ? +params.step : 0

  const { mutate, isLoading: isCreatingJob } = useMutation(createJob, {
    onSuccess: ({ id }) => {
      navigate(`/create-job/v2/${id}/1`)
    },
  })

  const handleCreate = () => {
    mutate()
  }

  return (
    <div className="flex flex-col h-full py-12 overflow-scroll bg-white">
      <div className="w-full max-w-4xl mx-auto ">
        <Show
          when={!!step}
          fallback={
            <Button
              onClick={handleCreate}
              loading={isCreatingJob}
              type="primary"
              size="large"
            >
              Create Job
            </Button>
          }
        >
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
