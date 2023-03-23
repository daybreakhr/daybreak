import { useState } from 'react'
import { Button } from 'antd'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Show } from 'ui-kit'
import { range } from 'lodash'
import Stage from './components/stage'
import EditableStage from './components/editable-stage'
import { fetchInterviews } from './queries'

export default function CreatePipeline() {
  const { jobId = '' } = useParams()
  const { pathname } = useLocation()
  const [newStage, setNewStage] = useState(false)
  const titlePrefix = pathname.split('/')[3]
  const navigate = useNavigate()

  const { data: interviews, isLoading } = useQuery(['interviews', jobId], () =>
    fetchInterviews(jobId),
  )

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
        <Show
          when={!isLoading}
          fallback={
            <div className="space-y-4">
              {range(5).map((val) => (
                <div
                  key={val}
                  className="flex-1 h-10 bg-gray-100 rounded animate-pulse"
                />
              ))}
            </div>
          }
        >
          {(interviews || []).map((item) => (
            <Stage
              key={item.id}
              title={item.title}
              id={item.id}
              jobId={jobId}
            />
          ))}
          <Show when={newStage}>
            <EditableStage
              onClose={() => setNewStage(false)}
              jobId={jobId}
              order={(interviews || []).length + 1}
            />
          </Show>
        </Show>
        <Show when={!newStage}>
          <Button
            type="link"
            icon={<PlusOutlined />}
            onClick={() => setNewStage(true)}
          >
            Add New Pipeline Stage
          </Button>
        </Show>
      </div>

      <div className="flex-1" />
      <div className="flex items-center justify-end space-x-4">
        <Link to={`/jobs/${jobId}/${titlePrefix}/1`}>
          <Button icon={<LeftOutlined />}>Back</Button>
        </Link>

        <Link to={`/jobs/${jobId}/${titlePrefix}/3`}>
          <Button
            type="primary"
            onClick={() => navigate(`/jobs/${jobId}/${titlePrefix}/3`)}
          >
            Continue
            <RightOutlined />
          </Button>
        </Link>
      </div>
    </div>
  )
}
