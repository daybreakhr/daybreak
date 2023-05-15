import { Button } from 'antd'
import { MailOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons'

import PageHeader from 'components/page-header'
import Template from './components/template'
import mailTemplates from './constants/mail-templates'

export default function EmailTemplates() {
  return (
    <>
      <PageHeader
        title="Email Templates"
        breadcrumb={[
          {
            label: 'Settings',
            path: '/settings/organisation',
            icon: <SettingOutlined />,
          },
          { label: 'Email Templates', path: '/settings/email-templates/' },
        ]}
      />

      <div className="p-4 m-8 bg-white rounded-md shadow-md">
        <div className="flex items-center mb-6 space-x-4">
          <div className="flex items-center p-2 text-white rounded bg-primary-main">
            <MailOutlined />
          </div>
          <p className="text-lg font-semibold">Email Templates</p>
          <div className="flex-1" />
          <Button icon={<PlusOutlined />} type="primary">
            Create New Template
          </Button>
        </div>

        <div className="space-y-6">
          {mailTemplates.map((template, idx) => (
            <Template key={idx} {...template} />
          ))}
        </div>
      </div>
    </>
  )
}
