import { useEffect, useState } from 'react'
import { Form, Input, Upload } from 'antd'
import type { Workspace } from '@prisma/client'
import { PlusOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'

import useAuth from 'hooks/use-auth'
import { customRequest } from '../utils'

type EditOrganisationProps = {
  initialValues: Workspace | undefined
}

export default function EditOrganisation({
  initialValues,
}: EditOrganisationProps) {
  const { user } = useAuth()

  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (initialValues && initialValues.logo) {
      const { logo, name } = initialValues
      setFileList([{ uid: logo, name, status: 'done', url: logo }])
    }
  }, [initialValues])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1))
  }

  return (
    <div className="px-4">
      <Upload
        fileList={fileList}
        listType="picture-card"
        onChange={handleChange}
        className="mb-4"
        customRequest={customRequest(user)}
        action={`workspace/${import.meta.env.VITE_WORKSPACE_ID}/upload`}
        showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
      >
        <div className="flex flex-col items-center justify-center w-24 h-24 space-y-3 rounded">
          <PlusOutlined />
          <p>Upload New</p>
        </div>
      </Upload>

      <div className="flex items-center w-full space-x-4">
        <Form.Item
          name="name"
          label="Name"
          className="flex-1"
          rules={[{ required: true, message: 'Enter Name of your workspace' }]}
        >
          <Input placeholder="Enter name of your organisation..." />
        </Form.Item>

        <Form.Item name="slug" label="Slug" className="w-64">
          <Input readOnly disabled />
        </Form.Item>
      </div>

      <Form.Item name="description" label="About Organisation">
        <Input.TextArea
          rows={5}
          style={{ resize: 'none' }}
          placeholder="Your organisation details will be part of every job description..."
        />
      </Form.Item>
    </div>
  )
}
