import { useState } from 'react'
import { Button } from 'antd'
import { range } from 'lodash'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MailOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { Switch } from 'ui-kit'

import PageHeader from 'components/page-header'
import Template from './components/template'
import MailModal from './components/mail-modal'
import { createEmailTemplate, fetchEmailTemplates } from './queries'

export default function EmailTemplates() {
  const initialValues = { name: '', subject: '', body: '' }
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading } = useQuery(['email-templates'], fetchEmailTemplates)

  const queryClient = useQueryClient()
  const { mutate: createTemplate, isLoading: isCreatingTemplate } = useMutation(
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
          <Switch>
            <Switch.Match when={isLoading}>
              {range(3).map((val) => (
                <div
                  key={val}
                  className="flex items-center px-4 py-3 space-x-3 border rounded-md"
                >
                  <div className="w-full h-6 max-w-lg bg-gray-100 rounded animate-pulse" />
                  <div className="flex-1" />
                  <div className="w-20 h-8 bg-gray-100 rounded animate-pulse" />
                  <div className="w-20 h-8 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </Switch.Match>

            <Switch.Match when={data}>
              {(data) =>
                data.map((template, idx) => (
                  <Template key={idx} {...template} />
                ))
              }
            </Switch.Match>
          </Switch>
        </div>
      </div>

      <MailModal
        {...initialValues}
        isOpen={isModalOpen}
        onSave={createTemplate}
        isLoading={isCreatingTemplate}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
