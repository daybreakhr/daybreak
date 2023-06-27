import { useState } from 'react'
import { HiX } from 'react-icons/hi'
import Dragger from 'antd/es/upload/Dragger'
import type { RcFile } from 'antd/es/upload'
import { useParams } from 'react-router-dom'
import { HiArrowUpTray } from 'react-icons/hi2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Drawer, Select, UploadFile, UploadProps } from 'antd'

import { storage } from 'ui-kit'
import { WORKSPACE_ID } from 'utils/constants'

import { createCandidateFromResume } from '../queries'
import { candidateSources } from '../constants/source-list'

type BulkUploadProps = {
  isOpen: boolean
  onClose: () => void
  title: string | undefined | null
}

export default function BulkUpload({
  isOpen,
  onClose,
  title,
}: BulkUploadProps) {
  const { jobId = '' } = useParams()
  const [uploading, setUploading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [selectedSource, setSelectedSource] = useState(undefined)

  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation(createCandidateFromResume, {
    onMutate: (formData) => {
      const file = formData.get('file') as RcFile
      setFileList((prev) =>
        prev.map((obj) => {
          if (obj.uid === file.uid) {
            obj.status = 'uploading'
            return obj
          } else {
            return obj
          }
        }),
      )
    },
    onError: (_, formData) => {
      const file = formData.get('file') as RcFile
      setFileList((prev) =>
        prev.map((obj) => {
          if (obj.uid === file.uid) {
            obj.status = 'error'
            return obj
          } else {
            return obj
          }
        }),
      )
    },
    onSuccess: (_, formData) => {
      const file = formData.get('file') as RcFile
      setFileList((prev) => prev.filter((obj) => obj.uid !== file.uid))
    },
  })

  const props: UploadProps = {
    fileList,
    name: 'files',
    maxCount: 20,
    multiple: true,
    disabled: !selectedSource,
    beforeUpload: (file) => {
      setFileList((prev) => [...prev, file])
      return false
    },
    onRemove: (file) => {
      setFileList((prev) => prev.filter(({ uid }) => uid !== file.uid))
    },
  }

  function handleClose() {
    setFileList([])
    setSelectedSource(undefined)
    onClose()
  }

  function handleUpload() {
    setUploading(true)

    Promise.all(
      fileList.map((file) => {
        const formData = new FormData()
        const workspaceId = storage.get(WORKSPACE_ID) ?? ''
        if (selectedSource) {
          formData.append('source', selectedSource)
        }
        formData.append('jobId', jobId)
        formData.append('workspaceId', workspaceId)
        formData.append('file', file as RcFile)
        return mutateAsync(formData)
      }),
    ).finally(() => {
      setUploading(false)
      queryClient.invalidateQueries(['candidates', jobId])
      handleClose()
    })
  }

  return (
    <Drawer
      width={480}
      open={isOpen}
      closable={false}
      onClose={handleClose}
      footer={
        <div className="flex items-center justify-end space-x-2">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary" loading={uploading} onClick={handleUpload}>
            Upload
          </Button>
        </div>
      }
    >
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold">Upload Resumes</p>
        <Button type="text" size="small" icon={<HiX />} onClick={handleClose} />
      </div>

      <hr className="my-5" />

      <p className="mb-4 text-xs text-gray-500">
        These Candidates will be added to {title}
      </p>

      <Select
        value={selectedSource}
        className="w-full mb-5"
        options={candidateSources}
        onChange={setSelectedSource}
        placeholder="Select source..."
      />

      <div className="h-56">
        <Dragger {...props}>
          <p className="mb-4 ant-upload-drag-icon">
            <HiArrowUpTray className="anticon" />
          </p>

          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="px-6 ant-upload-hint">
            PDF, Word or Rich Text only. 20 Resumes per batch are supported for
            bulk upload.
          </p>
        </Dragger>
      </div>
    </Drawer>
  )
}
