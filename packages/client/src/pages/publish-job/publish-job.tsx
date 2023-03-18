import { Button } from 'antd'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined, RocketOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateJobById } from 'pages/create-job/queries'

import Card from './components/card'
import { parseJob } from './queries'
import { publishers } from './constants/publishers'

export default function PublishJob() {
  const navigate = useNavigate()
  const { jobId = '' } = useParams()
  const { pathname } = useLocation()
  const titlePrefix = pathname.split('/')[3]

  const queryClient = useQueryClient()
  const { mutate: triggerJobParsing } = useMutation(parseJob)

  const { mutate, isLoading } = useMutation(updateJobById, {
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs'])
      navigate('/jobs')
      triggerJobParsing({ jobId })
    },
  })

  return (
    <div className="flex flex-col h-full">
      <p className="mb-4 font-sans text-xl font-medium">Publish Job</p>
      <div className="grid grid-cols-2 gap-5 mb-6">
        {publishers.map((publisher) => (
          <Card key={publisher.title} {...publisher} />
        ))}
      </div>

      <div className="flex-1" />

      <div className="flex items-center justify-end space-x-3">
        <Link to={`/jobs/${jobId}/${titlePrefix}/2`}>
          <Button icon={<LeftOutlined />}>Back</Button>
        </Link>

        <Button
          type="primary"
          loading={isLoading}
          icon={<RocketOutlined />}
          onClick={() => mutate({ jobId, updateJobDto: { isPublished: true } })}
        >
          Publish
        </Button>
      </div>
    </div>
  )
}
