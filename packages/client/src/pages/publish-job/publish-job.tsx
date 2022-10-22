import { Button } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  AiOutlineArrowLeft,
  AiOutlineLeft,
  AiOutlineRocket,
} from 'react-icons/ai'
import Card from './components/card'
import { publishers } from './constants/publishers'
import { updateJobById } from 'pages/create-job/queries'

export default function PublishJob() {
  const navigate = useNavigate()
  const { jobId = '' } = useParams()

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(updateJobById, {
    onSuccess: () => {
      queryClient.invalidateQueries(['jobs'])
      navigate('/jobs')
    },
  })

  return (
    <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
      <Link to="/jobs" className="flex items-center mb-4 space-x-2">
        <AiOutlineArrowLeft />
        <span>Jobs List</span>
      </Link>

      <div className="p-6 bg-white rounded-md shadow-md">
        <p className="mb-4 font-sans text-xl font-medium">Publish Job</p>
        <div className="grid grid-cols-2 gap-5 mb-6">
          {publishers.map((publisher) => (
            <Card key={publisher.title} {...publisher} />
          ))}
        </div>

        <div className="flex items-center justify-end space-x-3">
          <Link to={`/jobs/${jobId}/create`}>
            <Button icon={<AiOutlineLeft />}>Back</Button>
          </Link>

          <Button
            type="primary"
            loading={isLoading}
            icon={<AiOutlineRocket />}
            onClick={() =>
              mutate({ jobId, updateJobDto: { isPublished: true } })
            }
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}
