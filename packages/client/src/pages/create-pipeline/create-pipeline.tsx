import { useState } from 'react'
import { range } from 'lodash'
import { Button, Skeleton } from 'antd'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'

import { Show, Switch } from 'ui-kit'
import Stage from './components/stage'
import EditableStage, { InterviewData } from './components/editable-stage'
import { createPipelineStep, fetchInterviews } from './queries'

export default function CreatePipeline() {
  const { jobId = '' } = useParams()
  const { pathname } = useLocation()
  const [isEditable, setIsEditable] = useState(false)
  const titlePrefix = pathname.split('/')[3]

  const { data, isLoading } = useQuery(['interviews', jobId], () =>
    fetchInterviews(jobId),
  )

  const queryClient = useQueryClient()
  const { mutate: createInterview, isLoading: isCreatingInterview } =
    useMutation(createPipelineStep, {
      onSuccess: () => {
        queryClient.invalidateQueries(['interviews', jobId])
        setIsEditable(false)
      },
    })

  function handleCreateInterview(values: InterviewData) {
    createInterview({ ...values, order: data?.length ?? 0, jobId })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <p className="mb-2 text-lg font-semibold">Pipeline</p>
        <p>
          Manage candidates by setting up a hiring pipeline. By implementing a
          hiring pipeline, you can streamline your hiring process, improve the
          quality of your hires, and reduce the risk of bias and discrimination
          in the hiring process.
        </p>
      </div>

      <div className="space-y-4">
        <Switch>
          <Switch.Match when={isLoading}>
            {range(5).map((val) => (
              <Skeleton key={val} active title paragraph={{ rows: 0 }} />
            ))}
          </Switch.Match>

          <Switch.Match when={data}>
            {(data) => (
              <>
                {data.map((interview) => (
                  <Stage key={interview.id} {...interview} />
                ))}

                <Show
                  when={!isEditable}
                  fallback={
                    <EditableStage
                      onSave={handleCreateInterview}
                      isUpdating={isCreatingInterview}
                      onClose={() => setIsEditable(false)}
                    />
                  }
                >
                  <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={() => setIsEditable(true)}
                  >
                    Add New Pipeline Stage
                  </Button>
                </Show>
              </>
            )}
          </Switch.Match>
        </Switch>
      </div>

      <div className="flex-1" />

      <div className="flex items-center justify-end space-x-4">
        <Link to={`/jobs/${jobId}/${titlePrefix}/1`}>
          <Button icon={<LeftOutlined />}>Back</Button>
        </Link>

        <Link to={`/jobs/${jobId}/${titlePrefix}/3`}>
          <Button type="primary">
            Continue
            <RightOutlined />
          </Button>
        </Link>
      </div>
    </div>
  )
}
