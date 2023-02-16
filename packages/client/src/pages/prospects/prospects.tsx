import { useMemo, useState } from 'react'
import { Button, Input, Table } from 'antd'
import type { Job } from '@prisma/client'
import { matchSorter } from 'match-sorter'
import { useQuery } from '@tanstack/react-query'
import { PlusOutlined, SearchOutlined, TeamOutlined } from '@ant-design/icons'

import PageHeader from 'components/page-header'
import { fetchProspects } from 'pages/prospects/queries'
import { prospectColumns } from 'pages/prospects/constants/prospect-list'
import { Link } from 'react-router-dom'

export default function Prospects() {
  const [input, setInput] = useState('')
  const { data, isLoading } = useQuery(['prospects'], fetchProspects)

  const filteredData = matchSorter(data ?? [], input, {
    keys: ['firstName', 'middleName', 'lastName'],
  })

  const appliedFor = useMemo(() => {
    // if (data) {
    //   return data
    //     .map(({ Job }) => Job)
    //     .filter(
    //       (value, index, arr) =>
    //         value !== null &&
    //         arr.findIndex((val) => val?.id === value.id) === index,
    //     ) as Job[]
    // }
    return [] as Job[]
  }, [])

  return (
    <>
      <PageHeader
        title="Prospects List"
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
          <div className="flex items-center justify-between mb-4">
            <Input
              value={input}
              style={{ width: '16rem' }}
              prefix={<SearchOutlined />}
              placeholder="Search by Prospects Name..."
              onChange={(e) => setInput(e.target.value)}
            />

            <Link to="/prospects/create">
              <Button type="primary" icon={<PlusOutlined />}>
                Add Prospect
              </Button>
            </Link>
          </div>

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
