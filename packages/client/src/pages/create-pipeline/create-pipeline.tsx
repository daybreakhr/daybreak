import { useState } from 'react'
import { Button } from 'antd'
import { range } from 'lodash'
import { useParams } from 'react-router-dom'
import { PlusOutlined, WalletOutlined } from '@ant-design/icons'
import PageHeader from 'components/page-header'
import Stage from './components/stage'
import EditableStage from './components/editable-stage'

export default function CreatePipeline() {
  const { jobId = '' } = useParams()
  const [newStage, setNewStage] = useState(0)

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader
        title="Test Job"
        breadcrumb={[
          { label: 'Jobs', path: '/jobs', icon: <WalletOutlined /> },
          { label: 'Job', path: `/jobs/${jobId}` },
          { label: 'Pipeline', path: `/jobs/${jobId}/pipeline` },
        ]}
      />

      <div className="flex flex-col h-full px-8 pt-4 pb-8">
        <div className="flex flex-col flex-1 p-4 bg-white rounded-md shadow-md">
          <div className="mb-6">
            <p className="mb-2 text-lg font-semibold">Pipeline</p>
            <p>
              Manage candidates by setting up a hiring pipeline. By implementing
              a hiring pipeline, you can streamline your hiring process, improve
              the quality of your hires, and reduce the risk of bias and
              discrimination in the hiring process.
            </p>
          </div>

          <div className="max-w-5xl space-y-4">
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
            <Button>Back</Button>
            <Button type="primary">Continue</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
