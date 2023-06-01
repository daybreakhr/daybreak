import { RightOutlined } from '@ant-design/icons'
import { Invitees } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Form, Input, message, Select } from 'antd'
import { fetchMe } from 'components/auth/queries'
import useAuth from 'hooks/use-auth'
import { inviteUser } from 'pages/members/queries'
import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function InviteToWorkspace() {
  const navigate = useNavigate()
  const { setMember } = useAuth()
  const [enableMe, setEnableMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useQuery(['me'], fetchMe, {
    enabled: enableMe,
    onSuccess: (member) => {
      setMember(member)
      navigate('/home')
    },
  })

  const { mutateAsync: addUser } = useMutation(inviteUser)

  function handleSubmit({ invitees }: { invitees: Invitees[] }) {
    setIsLoading(true)
    Promise.all(invitees.map(({ email, role }) => addUser({ email, role })))
      .then(() => {
        setIsLoading(false)
        setEnableMe(true)
      })
      .catch(() => {
        message.error('Something went wrong!')
        setIsLoading(false)
      })
  }

  return (
    <div className="flex flex-col items-center w-full pt-[16vh] overflow-y-auto">
      <div className="w-full max-w-2xl mb-6">
        <p className="text-xl font-medium text-gray-700">
          Add member who you would like to invite to this workspace.
        </p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="grid w-full max-w-2xl grid-cols-1"
        initialValues={{ invitees: ['', '', ''] }}
      >
        <Form.List name="invitees">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <div className="flex items-center flex-1 space-x-2" key={key}>
                    <Form.Item
                      {...restField}
                      className="flex-1"
                      name={[name, 'email']}
                      rules={[
                        {
                          required: true,
                          type: 'email',
                          message: 'Enter a valid email address to invite',
                        },
                      ]}
                    >
                      <Input placeholder="Enter email address of invitee" />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'role']}
                      rules={[{ required: true, message: 'Select role' }]}
                    >
                      <Select placeholder="Select Role" style={{ width: 120 }}>
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="member">Member</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        danger
                        onClick={() => remove(name)}
                        disabled={fields.length === 1}
                      >
                        Remove
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button onClick={add}>Add</Button>
                    </Form.Item>
                  </div>
                )
              })}
            </div>
          )}
        </Form.List>
        <Form.Item className="col-span-3">
          <div className="flex items-center justify-end space-x-4">
            <Button onClick={() => setEnableMe(true)}>Skip</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
              <RightOutlined />
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
