import { Button, Drawer, Select, UploadFile, UploadProps } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { candidateSources } from 'pages/create-candidate/constants/source-list'
import { useState } from 'react'
import { HiX } from 'react-icons/hi'
import { HiArrowUpTray } from 'react-icons/hi2'

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
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [selectedSource, setSelectedSource] = useState(undefined)

  const props: UploadProps = {
    fileList,
    name: 'files',
    maxCount: 20,
    multiple: true,
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

  return (
    <Drawer
      width={480}
      open={isOpen}
      closable={false}
      onClose={handleClose}
      footer={
        <div className="flex items-center justify-end space-x-2">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="primary">Upload</Button>
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
