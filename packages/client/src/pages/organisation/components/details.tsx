import { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Button, Form, message, Skeleton } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Switch } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import { fetchOrganisation, updateOrganisation } from '../queries'
import EditOrganisation from './edit-organisation'

export default function OrgDetails() {
  const { member } = useAuth()
  const [form] = Form.useForm()
  const [showEditForm, setShowEditForm] = useState(false)

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery(['organisation'], fetchOrganisation, {
    onSuccess: (data) => {
      form.setFieldsValue(data)
    },
  })
  const { mutate, isLoading: isOrganisationUpdating } = useMutation(
    updateOrganisation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['organisation'])
        setShowEditForm(false)
        message.success('Successfully updated your organisation settings')
      },
    },
  )

  function handleCancel() {
    setShowEditForm(false)
    form.setFieldsValue(data)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      className="py-4 m-8 bg-white rounded-md shadow-md"
      onFinish={(updateWorkspaceDto) => mutate({ updateWorkspaceDto })}
    >
      <div className="flex items-center px-4 space-x-4">
        <p className="mb-4 font-sans text-xl font-medium">
          Organisation Details
        </p>
        <div className="flex-1" />

        <Switch>
          <Switch.Match when={!showEditForm && member?.role === 'admin'}>
            <Button
              type="primary"
              disabled={!data}
              icon={<EditOutlined />}
              onClick={() => setShowEditForm(true)}
            >
              Edit
            </Button>
          </Switch.Match>

          <Switch.Match when={showEditForm}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isOrganisationUpdating}
            >
              Save Changes
            </Button>
          </Switch.Match>
        </Switch>
      </div>

      <Switch>
        <Switch.Match when={isLoading}>
          <div className="px-4 space-y-4">
            <Skeleton.Image active />
            <Skeleton active title paragraph={{ rows: 3 }} />
          </div>
        </Switch.Match>

        <Switch.Match when={showEditForm}>
          <EditOrganisation initialValues={data} />
        </Switch.Match>

        <Switch.Match when={data}>
          {({ logo, name, slug, description }) => (
            <>
              <img width={80} src={logo ?? ''} className="mx-4 mb-4" />

              <div className="grid grid-cols-12 p-4 bg-gray-50">
                <p className="col-span-2 text-gray-500">Company Name</p>
                <p className="col-span-10">{name}</p>
              </div>

              <div className="grid grid-cols-12 p-4">
                <p className="col-span-2 text-gray-500">Workspace slug</p>
                <p className="col-span-10">{slug}</p>
              </div>

              <div className="grid grid-cols-12 p-4 bg-gray-50">
                <p className="col-span-2 text-gray-500">Company Description</p>
                <p className="col-span-10">{description}</p>
              </div>
            </>
          )}
        </Switch.Match>
      </Switch>
    </Form>
  )
}
