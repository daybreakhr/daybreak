import { useState } from 'react'
import { Button, Form, Input, Modal, Select, Table } from 'antd'
import { matchSorter } from 'match-sorter'
import { AiOutlineFilter, AiOutlineSearch } from 'react-icons/ai'
import useAuth from 'hooks/use-auth'
import { sampleData, columns, Member } from './members-list'

export default function Members() {
  const { user } = useAuth()
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('')
  const [isOpen, setIsOpen] = useState(false)

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

        <Button type="primary" onClick={() => setIsOpen(!isOpen)}>
          Add Users
        </Button>
        <Modal
          okText="Add"
          visible={isOpen}
          title="Add new member"
          onCancel={() => setIsOpen(false)}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Form
            name="basic"
            autoComplete="off"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={(values: any) => {
              console.log(values)
              setIsOpen(false)
            }}
            onFinishFailed={(errorInfo: any) => console.log(errorInfo)}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input a valid email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Please select the role!' }]}
            >
              <Select>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="member">Member</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <Table dataSource={filterRoleData} columns={columns} />
    </div>
  )
}
