import { Avatar, Button, List, Switch } from 'antd'
import LinkedInIcon from 'assets/icons/linkedin.svg'
import InternshalaIcon from 'assets/icons/internshala.svg'
import CareerPortalIcon from 'assets/icons/career-portal.svg'
import NaukriIcon from 'assets/icons/naukri.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parseJob, updateJobById } from '../queries'

const data = [
  {
    icon: CareerPortalIcon,
    title: 'Career Portal',
    active: true,
    isComingSoon: false,
  },
  {
    icon: NaukriIcon,
    title: 'Naukri',
    active: true,
    isComingSoon: true,
  },
  {
    icon: InternshalaIcon,
    title: 'Internshala',
    active: true,
    isComingSoon: true,
  },
  {
    icon: LinkedInIcon,
    title: 'Linkedin',
    active: true,
    isComingSoon: true,
  },
]

export default function JobPublish() {
  const navigate = useNavigate()
  const { jobId = '' } = useParams()

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
    <div className="max-w-xl m-auto">
      <div className="my-8">
        <p className="text-xl font-semibold">Publish Your Job</p>
        <p className="text-sm text-gray-500">
          You are ready to start hiring process.
        </p>
      </div>

      <p className="text-xs">Publish on</p>
      <div className="my-3 ">
        <List
          size="large"
          bordered={false}
          dataSource={data}
          renderItem={(item, key) => (
            <List.Item
              actions={
                item.isComingSoon
                  ? [
                      <p className="text-xs" key={key}>
                        COMING SOON
                      </p>,
                    ]
                  : [
                      <Switch
                        key={key}
                        size="small"
                        defaultChecked
                        style={{ background: 'green' }}
                      />,
                    ]
              }
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" src={item.icon} />}
                title={
                  <p className="mt-1 text-sm font-semibold">{item.title}</p>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <div className="mt-3 ">
        <Button
          size="large"
          type="primary"
          className="w-full"
          loading={isLoading}
          onClick={() => mutate({ jobId, updateJobDto: { isPublished: true } })}
        >
          Publish Job
        </Button>
      </div>
    </div>
  )
}
