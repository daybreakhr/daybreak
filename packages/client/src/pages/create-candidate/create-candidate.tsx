import { WalletOutlined } from '@ant-design/icons'
import PageHeader from 'components/page-header'
import CandidateForm from './components/create-candidate-form'

export default function CreateCandidate() {
  return (
    <>
      <PageHeader
        title={'Add Candidate'}
        breadcrumb={[
          { label: 'Candidate List', path: '/jobs', icon: <WalletOutlined /> },
          { label: 'Candidate', path: '/jobs' },
        ]}
      />

      <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
        <div className="p-6 bg-white rounded-md shadow-md">
          <CandidateForm />
        </div>
      </div>
    </>
  )
}
