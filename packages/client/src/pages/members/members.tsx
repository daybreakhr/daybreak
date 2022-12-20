import { useState } from 'react'
import clsx from 'clsx'
import { matchSorter } from 'match-sorter'
import { useQueries } from '@tanstack/react-query'
import { Button, Input, Select, Table } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { AiOutlineFilter, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'

import PageHeader from 'components/page-header'
import { columns } from './members-list'
import AddUser from './components/add-user'
import { fetchInvitedMembers, fetchMembers } from './queries'
import { getMemberTableData } from './utils'

export default function Members() {
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const [
    { data: members, isLoading: isMembersLoading },
    { data: invitees, isLoading: isInviteesLoading },
  ] = useQueries({
    queries: [
      { queryKey: ['members'], queryFn: fetchMembers },
      { queryKey: ['invite'], queryFn: fetchInvitedMembers },
    ],
  })

  const isLoading = isInviteesLoading || isMembersLoading
  const allMembers = getMemberTableData(members, invitees)

  const filteredData = matchSorter(allMembers, input, {
    keys: ['displayName', 'email'],
  })

  const filterRoleData = matchSorter(filteredData, filter, { keys: ['role'] })

  return (
    <>
      <PageHeader
        title="Members"
        breadcrumb={[
          {
            label: 'Settings',
            path: '/settings/organisation',
            icon: <SettingOutlined />,
          },
          { label: 'Members', path: '/settings/members' },
        ]}
      />

      <div className="p-4 m-8 bg-white rounded-md shadow-md">
        <div className="flex items-center mb-4 space-x-4">
          <Input
            value={input}
            style={{ width: '16rem' }}
            prefix={<AiOutlineSearch />}
            placeholder="Search by name or email..."
            onChange={(e) => setInput(e.target.value)}
          />

          <Select
            value={filter}
            className="w-32"
            defaultValue="all"
            suffixIcon={<AiOutlineFilter />}
            onChange={(e) => setFilter(e)}
          >
            <Select.Option value="">All Users</Select.Option>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Member">Member</Select.Option>
          </Select>

          <div className="flex-1" />

          <Button
            type="primary"
            icon={<AiOutlinePlus />}
            onClick={() => setIsVisible((prev) => !prev)}
          >
            Add User
          </Button>
        </div>

        <Table
          columns={columns}
          loading={isLoading}
          dataSource={filterRoleData}
          rowKey={(record) => record.rowId}
          onRow={(row) => ({ className: clsx({ 'opacity-50': !row.uid }) })}
        />

        <AddUser isVisible={isVisible} onClose={() => setIsVisible(false)} />
      </div>
    </>
  )
}
