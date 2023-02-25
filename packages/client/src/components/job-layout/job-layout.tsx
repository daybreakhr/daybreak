import { Steps } from 'antd'
import { capitalize } from 'lodash'
import { WalletOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import PageHeader from 'components/page-header'

export default function JobLayout() {
  const navigate = useNavigate()
  const { jobId = '' } = useParams()
  const { pathname } = useLocation()
  const titlePrefix = pathname.split('/')[3]
  const currentStep = ~~pathname.split('/')[4] - 1

  function handleStepChange(step: number) {
    // Only backward steps are allowed
    if (step < currentStep) {
      navigate(`${step + 1}`)
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader
        title={`${capitalize(titlePrefix)} Job`}
        breadcrumb={[
          { label: 'Jobs', path: '/jobs', icon: <WalletOutlined /> },
          { label: 'Job', path: `/jobs/${jobId}` },
          {
            label: capitalize(titlePrefix),
            path: `/jobs/${jobId}/${titlePrefix}`,
          },
        ]}
      />

      <div className="flex flex-1 px-8 pt-4 pb-8 space-x-4">
        <div>
          <div className="px-6 pt-6 bg-white rounded-md shadow">
            <Steps
              progressDot
              size="small"
              className="h-40"
              direction="vertical"
              current={currentStep}
              onChange={handleStepChange}
              items={[
                { title: 'Enter Job Details' },
                { title: 'Setup Hiring Pipeline' },
                { title: 'Publish Job' },
              ]}
            />
          </div>
        </div>

        <div className="flex-1 p-6 bg-white rounded-md shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
