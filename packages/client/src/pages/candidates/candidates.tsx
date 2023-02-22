import { useMemo, useState } from 'react'
import { uniqBy, flatMap } from 'lodash'
import { Button, Input, Table } from 'antd'
import type { Job } from '@prisma/client'
import { matchSorter } from 'match-sorter'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { PlusOutlined, SearchOutlined, TeamOutlined } from '@ant-design/icons'

import PageHeader from 'components/page-header'
import { fetchCandidates } from 'pages/candidates/queries'
import { candidateColumns } from 'pages/candidates/constants/candidate-list'

export default function Candidates() {
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  const { data, isLoading } = useQuery(['candidates'], fetchCandidates)

  const filteredData = matchSorter(data ?? [], input, {
    keys: ['firstName', 'middleName', 'lastName'],
  })

  const appliedFor = useMemo(() => {
    if (data) {
      return uniqBy(
        flatMap(data, (prospect) => prospect.Job),
        (job) => job.id,
      )
    }
    return [] as Job[]
  }, [data])

  return (
    <>
      <PageHeader
        title="Candidate List"
        breadcrumb={[
          { path: '/candidates', label: 'Candidates', icon: <TeamOutlined /> },
        ]}
        tabs={[
          { label: 'Candidates', key: '/candidates' },
          { label: 'Prospects', key: '/prospects/' },
        ]}
      />
      <div className="p-4 m-8 bg-white rounded-md shadow-md">
        <div className="flex items-center justify-between mb-4 space-x-4">
          <Input
            value={input}
            style={{ width: '16rem' }}
            prefix={<SearchOutlined />}
            placeholder="Search by Candidate Name..."
            onChange={(e) => setInput(e.target.value)}
          />

          <Link to="/candidates/create">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Candidate
            </Button>
          </Link>
        </div>

        <Table
          loading={isLoading}
          dataSource={filteredData}
          rowKey={(record) => record.id}
          columns={candidateColumns(appliedFor)}
          onRow={(record) => ({
            className: 'cursor-pointer',
            onClick: () => navigate(`${record.id}`),
          })}
        />
      </div>
    </>
  )
}
