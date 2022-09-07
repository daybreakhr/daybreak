import { useState } from 'react'
import { Button, Input, Select, Table } from 'antd'
import { matchSorter } from 'match-sorter'
import { AiOutlineFilter, AiOutlineSearch } from 'react-icons/ai'
import useAuth from 'hooks/use-auth'
import { sampleData, columns, Member } from './members-list'

export default function Members() {
  const { user } = useAuth()
  const [input, setInput] = useState('')

  const data: Member[] = [
    {
      email: user?.email ?? '',
      name: user?.displayName ?? '',
      role: 'Admin',
      photoURL: user?.photoURL,
      key: user?.uid ?? '',
    },
    ...sampleData,
  ]

  const filteredData = matchSorter(data, input, {
    keys: ['name', 'email'],
  })

  return (
    <div className="m-8 p-4 bg-white rounded-md shadow-md">
      <div className="flex items-center mb-4 space-x-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '16rem' }}
          prefix={<AiOutlineSearch />}
          placeholder="Search by name or email..."
        />

        <Select
          className="w-28"
          defaultValue="all"
          suffixIcon={<AiOutlineFilter />}
        >
          <Select.Option value="all">All Users</Select.Option>
          <Select.Option value="Admin">Admin</Select.Option>
          <Select.Option value="Member">Member</Select.Option>
        </Select>

        <div className="flex-1" />

        <Button type="primary">Add Users</Button>
      </div>

      <Table dataSource={filteredData} columns={columns} />
    </div>
  )
}
