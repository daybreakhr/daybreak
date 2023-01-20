import { useState } from 'react'
import { Input, Table } from 'antd'
import { SearchOutlined, TeamOutlined } from '@ant-design/icons'

import PageHeader from 'components/page-header'
import { sampleData, mockProspectColumns } from './constants/mock-prospect-list'

export default function Prospects() {
  const [input, setInput] = useState('')

  return (
    <>
      <PageHeader
        title="Proespects List"
        breadcrumb={[
          { path: '/prospects', label: 'Prospects', icon: <TeamOutlined /> },
        ]}
        tabs={[
          { label: 'Candidates', key: '/candidates' },
          { label: 'Prospects', key: '/prospects/' },
        ]}
      />

      <div className="p-8">
        <div className="p-4 bg-white rounded-md shadow-md">
          <Input
            value={input}
            className="mb-4"
            style={{ width: '16rem' }}
            prefix={<SearchOutlined />}
            placeholder="Search by Prospects Name..."
            onChange={(e) => setInput(e.target.value)}
          />

          <Table dataSource={sampleData} columns={mockProspectColumns()} />
        </div>
      </div>
    </>
  )
}
