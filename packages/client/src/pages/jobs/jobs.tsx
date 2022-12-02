import { useMemo, useState } from 'react'
import { matchSorter } from 'match-sorter'
import { Button, Input, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { Department } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PlusOutlined, SearchOutlined, WalletOutlined } from '@ant-design/icons'

import { Show } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import PageHeader from 'components/page-header'
import { jobColumns } from './constants/job-list'
import { createJob, fetchJobs } from './queries'

export default function Jobs() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  const { data, isLoading } = useQuery(['jobs'], fetchJobs)

  const { mutate, isLoading: isCreatingJob } = useMutation(createJob, {
    onSuccess: ({ id }) => {
      navigate(`/jobs/${id}/create`)
    },
  })

  const filteredData = matchSorter(data ?? [], input, {
    keys: ['title'],
  })

  const uniqueDepartments = useMemo(() => {
    if (data) {
      return data
        .map(({ Department }) => Department)
        .filter(
          (value, index, arr) =>
            value !== null &&
            arr.findIndex((val) => val?.id === value.id) === index,
        ) as Department[]
    }
    return [] as Department[]
  }, [data])

  return (
    <>
      <PageHeader
        title="Job List"
        breadcrumb={[
          { path: '/jobs', label: 'Jobs', icon: <WalletOutlined /> },
        ]}
      />

      <div className="p-8">
        <div className="p-4 bg-white rounded-md shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Input
              value={input}
              style={{ width: '16rem' }}
              prefix={<SearchOutlined />}
              placeholder="Search by Job Role..."
              onChange={(e) => setInput(e.target.value)}
            />

            <Show when={user?.role === 'admin'}>
              <Button
                type="primary"
                loading={isCreatingJob}
                icon={<PlusOutlined />}
                onClick={() => mutate()}
              >
                Create Job
              </Button>
            </Show>
          </div>

          <Table
            loading={isLoading}
            dataSource={filteredData}
            rowKey={(record) => record.id}
            columns={jobColumns(uniqueDepartments)}
            onRow={({ id }) => ({
              className: 'cursor-pointer',
              onClick: () => navigate(`/jobs/${id}`),
            })}
          />
        </div>
      </div>
    </>
  )
}
