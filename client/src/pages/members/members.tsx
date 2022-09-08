import { useState } from 'react'
import { matchSorter } from 'match-sorter'
import { Button, Input, Select, Table } from 'antd'
import { AiOutlineFilter, AiOutlineSearch } from 'react-icons/ai'
import useAuth from 'hooks/use-auth'
import { sampleData, columns, Member } from './members-list'
import AddUser from './components/add-user'

export default function Members() {
  const { user } = useAuth()

  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('')
  const [isVisible, setIsVisible] = useState(false)

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

  const filterRoleData = matchSorter(filteredData, filter, { keys: ['role'] })

  return (
    <div className="m-8 p-4 bg-white rounded-md shadow-md">
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
          className="w-28"
          defaultValue="all"
          suffixIcon={<AiOutlineFilter />}
          onChange={(e) => setFilter(e)}
        >
          <Select.Option value="">All Users</Select.Option>
          <Select.Option value="Admin">Admin</Select.Option>
          <Select.Option value="Member">Member</Select.Option>
        </Select>

        <div className="flex-1" />

        <Button type="primary" onClick={() => setIsVisible((prev) => !prev)}>
          Add User
        </Button>
      </div>

      <Table dataSource={filterRoleData} columns={columns} />

      <AddUser isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </div>
  )
}
