import { useState } from 'react'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { ReactComponent as PencilIcon } from 'assets/icons/pencil.svg'
import { ReactComponent as FileImportIcon } from 'assets/icons/file-import.svg'
import { ReactComponent as UserArrowDown } from 'assets/icons/user-arrow-down.svg'

import BulkUpload from './bulk-upload'
import CreateCandidate from './create-candidate'

type ImportTalentProps = {
  title: string | undefined | null
}

export default function ImportTalent({ title }: ImportTalentProps) {
  const [bulkImportDrawer, setBulkImportDrawer] = useState(false)
  const [createCandiateDrawer, setCreateCandidateDrawer] = useState(false)

  const importCandidateItems: MenuProps['items'] = [
    { key: '1', label: 'Import Resumes', icon: <FileImportIcon /> },
    { key: '2', label: 'Add Manually', icon: <PencilIcon /> },
  ]

  const handleImportClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') setBulkImportDrawer(true)
    else if (key === '2') setCreateCandidateDrawer(true)
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

      <BulkUpload
        title={title}
        isOpen={bulkImportDrawer}
        onClose={() => setBulkImportDrawer(false)}
      />

      <CreateCandidate
        title={title}
        isOpen={createCandiateDrawer}
        onClose={() => setCreateCandidateDrawer(false)}
      />
    </>
  )
}
