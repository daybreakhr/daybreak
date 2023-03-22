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

type NewStage = {
  id: string
  title: string
}

export default function CreatePipeline() {
  const { jobId = '' } = useParams()
  const { pathname } = useLocation()
  const [newStages, setNewStages] = useState<NewStage[]>([])
  const titlePrefix = pathname.split('/')[3]
  const navigate = useNavigate()

  const { data: interviews, isLoading } = useQuery(['interviews', jobId], () =>
    fetchInterviews(jobId),
  )

  const addNewStage = () => {
    const id = new Date().toISOString()
    const stage = { id, title: '' }
    newStages.push(stage)
    setNewStages([...newStages])
  }

  const onRemoveStage = (stageId: string) => {
    const stages = newStages.filter(({ id }) => id !== stageId)
    setNewStages([...stages])
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
          {newStages.map(({ id }) => (
            <EditableStage
              jobId={jobId}
              key={id}
              onClose={() => onRemoveStage(id)}
            />
          ))}
        </Show>
        <Button type="link" icon={<PlusOutlined />} onClick={addNewStage}>
          Add New Pipeline Stage
        </Button>
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
