import { useMemo, useState } from 'react'
import { Input, Table } from 'antd'
import type { Job } from '@prisma/client'
import { matchSorter } from 'match-sorter'
import { useQuery } from '@tanstack/react-query'
import { SearchOutlined, TeamOutlined } from '@ant-design/icons'

import PageHeader from 'components/page-header'
import { fetchCandidates } from 'pages/prospects/queries'
import { prospectColumns } from 'pages/prospects/constants/prospect-list'

export default function Prospects() {
  const [input, setInput] = useState('')
  const { data, isLoading } = useQuery(['candidates'], fetchCandidates)

  const filteredData = matchSorter(data ?? [], input, {
    keys: ['firstName', 'middleName', 'lastName'],
  })

  const appliedFor = useMemo(() => {
    if (data) {
      return data
        .map(({ Job }) => Job)
        .filter(
          (value, index, arr) =>
            value !== null &&
            arr.findIndex((val) => val?.id === value.id) === index,
        ) as Job[]
    }
    return [] as Job[]
  }, [data])

  return (
    <>
      <PageHeader
        title="Proespects List"
        breadcrumb={[
          { path: '/prospects', label: 'Prospects', icon: <TeamOutlined /> },
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

          <Table
            loading={isLoading}
            dataSource={filteredData}
            rowKey={(record) => record.id}
            columns={prospectColumns(appliedFor, [])}
          />
        </div>
      </div>
    </>
  )
}
