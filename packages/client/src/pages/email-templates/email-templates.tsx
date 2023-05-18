import { useState } from 'react'
import { Button } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MailOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons'

import PageHeader from 'components/page-header'
import Template from './components/template'
import { createEmailTemplate, fetchEmailTemplates } from './queries'
import MailModal from './components/mail-modal'

export default function EmailTemplates() {
  const initialValues = { name: '', subject: '', body: '' }
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data } = useQuery(['email-templates'], fetchEmailTemplates)

  const queryClient = useQueryClient()
  const { mutate: createTemplate, isLoading } = useMutation(
    createEmailTemplate,
    {
      onSuccess: () => {
        setIsModalOpen(false)
        queryClient.invalidateQueries(['email-templates'])
      },
    },
  )

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
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Create New Template
          </Button>
        </div>

        <div className="space-y-6">
          {data?.map((template, idx) => (
            <Template key={idx} {...template} />
          ))}
        </div>
      </div>

      <MailModal
        {...initialValues}
        isOpen={isModalOpen}
        isLoading={isLoading}
        onSave={createTemplate}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
