import { Button, Input, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { formatNumber } from 'ui-kit'
import PageHeader from 'components/page-header'

export default function Referrals() {
  return (
    <>
      <PageHeader
        title="Referrals"
        breadcrumb={[{ path: '/referrals/jobList', label: 'Jobs' }]}
        tabs={[
          { label: 'Jobs', key: '/referrals/jobList' },
          { label: 'My Referrals', key: '/referrals/list' },
        ]}
      />
      <div className="p-4 m-8 bg-white rounded-md shadow-md">
        <Input
          className="mb-4"
          style={{ width: '16rem' }}
          prefix={<SearchOutlined />}
          placeholder="Search by Job Title..."
        />

        <Table
          dataSource={[
            {
              id: 1,
              title: 'Senior Software Engineer',
              department: 'Engineering',
              recruiter: 'John Doe',
              referralBonus: 3000,
            },
            {
              id: 1,
              title: 'Senior Software Engineer',
              department: 'Engineering',
              recruiter: 'John Doe',
              referralBonus: 3000,
            },
            {
              id: 1,
              title: 'Senior Software Engineer',
              department: 'Engineering',
              recruiter: 'John Doe',
              referralBonus: 3000,
            },
            {
              id: 1,
              title: 'Senior Software Engineer',
              department: 'Engineering',
              recruiter: 'John Doe',
              referralBonus: 3000,
            },
            {
              id: 1,
              title: 'Senior Software Engineer',
              department: 'Engineering',
              recruiter: 'John Doe',
              referralBonus: 3000,
            },
          ]}
          rowKey={(record) => record.id}
          columns={[
            { title: 'Job Title', dataIndex: 'title', key: 'title' },
            { title: 'Department', dataIndex: 'department', key: 'department' },
            { title: 'Recruiter', dataIndex: 'recruiter', key: 'recruiter' },
            {
              title: 'Bonus',
              dataIndex: 'referralBonus',
              key: 'referralBonus',
              render: (text) => (
                <span className="font-semibold text-green-600">
                  $ {formatNumber(text)}
                </span>
              ),
            },
            {
              dataIndex: 'action',
              key: 'action',
              render: () => (
                <div className="space-x-2">
                  <Button
                    type="link"
                    target="_blank"
                    href="https://boards.daybreakhire.com/daybreak_hr/jobs/632af894950e8f9f5fea6d50"
                    icon={<HiOutlineExternalLink className="anticon" />}
                  >
                    View Job
                  </Button>
                  <Button>Add Referral</Button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  )
}
