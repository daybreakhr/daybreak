import { useState } from 'react'
import { Button } from 'antd'
import { range } from 'lodash'
import { Link, useLocation, useParams } from 'react-router-dom'
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import Stage from './components/stage'
import EditableStage from './components/editable-stage'

export default function CreatePipeline() {
  const { jobId = '' } = useParams()
  const { pathname } = useLocation()
  const [newStage, setNewStage] = useState(0)
  const titlePrefix = pathname.split('/')[3]

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
        <Stage title="Phone Screen" color="red" />
        <Stage title="On-site Coding" color="blue" />
        <Stage
          title="Bug Bash"
          description="Fix issues in an open source react project"
          color="green"
        />
        <Stage title="Hiring Manager" color="indigo" />

        {range(newStage).map((val) => (
          <EditableStage
            key={val}
            onClose={() => setNewStage((prev) => prev - 1)}
          />
        ))}

        <Button
          type="link"
          icon={<PlusOutlined />}
          onClick={() => setNewStage((prev) => prev + 1)}
        >
          Add New Pipeline Stage
        </Button>
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
