import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import type { UploadFile, UploadProps } from 'antd'
import { Button, Form, Input, message, Upload } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useAuth from 'hooks/use-auth'
import { fetchOrganisation, updateOrganisation } from '../queries'
import { customRequest } from '../utils'

export default function OrgDetails() {
  const { user } = useAuth()
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useQuery(['organisation'], fetchOrganisation, {
    onSuccess: (data) => {
      form.setFieldsValue({ ...data })
      if (data.logo) {
        setFileList([
          { uid: data.logo, name: data.name, status: 'done', url: data.logo },
        ])
      }
    },
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading: isOrganisationUpdating } = useMutation(
    updateOrganisation,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['organisation'])
        message.success('Successfully updated your organisation settings')
      },
    },
  )

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1))
  }

  return (
    <div className="p-4 m-8 bg-white rounded-md shadow-md">
      <p className="mb-4 font-sans text-xl font-medium">Organisation Details</p>
      <Upload
        fileList={fileList}
        listType="picture-card"
        onChange={handleChange}
        customRequest={customRequest(user)}
        action={`workspace/${import.meta.env.VITE_WORKSPACE_ID}/upload`}
        showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
      >
        <div className="flex flex-col items-center justify-center w-24 h-24 space-y-3 rounded">
          <AiOutlinePlus />
          <p>Upload</p>
        </div>
      </Upload>

      <Form
        form={form}
        layout="vertical"
        onFinish={(updateWorkspaceDto) => mutate({ updateWorkspaceDto })}
      >
        <div className="flex items-center w-full space-x-4">
          <Form.Item
            name="name"
            label="Name"
            className="flex-1"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter name of your organisation..." />
          </Form.Item>

          <Form.Item name="slug" label="Slug" className="w-64">
            <Input readOnly disabled />
          </Form.Item>
        </div>

        <Form.Item name="description" label="About Organisation">
          <Input.TextArea
            rows={4}
            placeholder="Your organisation details will be part of every job description..."
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isOrganisationUpdating}
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
