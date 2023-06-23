import { useState } from 'react'
import { HiX } from 'react-icons/hi'
import Dragger from 'antd/es/upload/Dragger'
import { HiArrowUpTray } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { Button, Drawer, Dropdown, MenuProps } from 'antd'

import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg'
import { ReactComponent as FileImportIcon } from 'assets/icons/file-import.svg'
import { ReactComponent as UserArrowDown } from 'assets/icons/user-arrow-down.svg'

type ImportTalentProps = {
  title: string | undefined | null
}

export default function ImportTalent({ title }: ImportTalentProps) {
  const navigate = useNavigate()
  const [bulkImportDrawer, setBulkImportDrawer] = useState(false)

  const importCandidateItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Import Resumes',
      icon: <FileImportIcon />,
      disabled: true,
    },
    { key: '2', label: 'Add Manually', icon: <PencilIcon /> },
  ]

  const handleImportClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      setBulkImportDrawer(true)
    }
    if (key === '2') {
      navigate('/candidates/create')
    }
  }

  function onClose() {
    setBulkImportDrawer(false)
  }

  return (
    <>
      <Dropdown
        menu={{
          items: importCandidateItems,
          onClick: handleImportClick,
        }}
      >
        <div className="flex items-center px-2 py-1 space-x-2 border rounded-md shadow cursor-pointer">
          <UserArrowDown className="text-primary-500" />
          <span>Import Talent</span> <DownOutlined />
        </div>
      </Dropdown>

      <Drawer
        width={480}
        closable={false}
        onClose={onClose}
        open={bulkImportDrawer}
      >
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold">Upload Resumes</p>
          <Button size="small" type="text" icon={<HiX />} onClick={onClose} />
        </div>

        <hr className="my-5" />

        <p className="mb-4 text-xs text-gray-500">
          These Candidates will be added to {title}
        </p>

        <div className="h-56">
          <Dragger>
            <p className="mb-4 ant-upload-drag-icon">
              <HiArrowUpTray className="anticon" />
            </p>

            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="px-6 ant-upload-hint">
              PDF, Word or Rich Text only. 20 Resumes per batch are supported
              for bulk upload.
            </p>
          </Dragger>
        </div>
      </Drawer>
    </>
  )
}
