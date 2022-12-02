import { capitalize } from 'lodash'
import { WalletOutlined } from '@ant-design/icons'
import { useLocation, useParams } from 'react-router-dom'
import PageHeader from 'components/page-header'
import JobForm from './components/job-form'

export default function CreateJobs() {
  const { jobId = '' } = useParams()
  const { pathname } = useLocation()
  const titlePrefix = pathname.split('/')[3]

  return (
    <>
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

      <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
        <div className="p-6 bg-white rounded-md shadow-md">
          <JobForm />
        </div>
      </div>
    </>
  )
}
