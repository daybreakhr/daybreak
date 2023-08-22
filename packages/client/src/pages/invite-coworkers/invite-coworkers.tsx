import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons'
import { Invitees } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Divider, Form, Input, Select, message } from 'antd'
import { fetchMe } from 'components/auth/queries'
import useAuth from 'hooks/use-auth'
import { inviteUser } from 'pages/members/queries'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from 'ui-kit'

export default function InviteCoworkers() {
  const { Option } = Select
  const navigate = useNavigate()
  const { setMember } = useAuth()
  const [enableMe, setEnableMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useQuery(['me'], fetchMe, {
    enabled: enableMe,
    onSuccess: (member) => {
      setMember(member)
      navigate('/onboarding/slack')
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
    <div className="flex-1 py-32 overflow-hidden">
      <div className="w-[690px] mx-auto">
        <div className="text-center">
          <p className="mb-2 text-2xl font-semibold">
            Invite Co-workers to your hiring team
          </p>
          <p className="text-base text-gray-500">
            Build a unified hiring process by inviting your team members to join
            Daybreak. Collaborate on candidate evaluations, feedbacks and
            interviews effortlessly
          </p>
        </div>

        <Form
          layout="vertical"
          initialValues={{ invitees: [''] }}
          onFinish={handleSubmit}
        >
          <div className="py-12">
            <Card className="px-8 py-8 w-[698px]">
              <p className="mb-1 font-semibold">Email</p>

              <Form.List name="invitees">
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map(({ key, name, ...restField }) => {
                        return (
                          <Form.Item
                            name={[name, 'email']}
                            key={key}
                            {...restField}
                            rules={[
                              {
                                required: true,
                                type: 'email',
                                message:
                                  'Enter a valid email address to invite',
                              },
                            ]}
                            className="mb-4"
                          >
                            <Input
                              size="large"
                              placeholder="email@example.com"
                              addonAfter={
                                <Form.Item
                                  noStyle
                                  name={[name, 'role']}
                                  rules={[
                                    { required: true, message: 'Select role' },
                                  ]}
                                >
                                  <Select
                                    className="w-32 bg-white"
                                    placeholder="Role"
                                    bordered={false}
                                    dropdownRender={(menu) => {
                                      return (
                                        <>
                                          {menu}
                                          <Divider className="my-1" />
                                          <Button
                                            block
                                            type="text"
                                            onClick={() => remove(name)}
                                            disabled={fields.length === 1}
                                          >
                                            <div className="ml-[-45px]">
                                              Remove
                                            </div>
                                          </Button>
                                        </>
                                      )
                                    }}
                                  >
                                    <Option value="admin">Admin</Option>
                                    <Option value="member">Member</Option>
                                  </Select>
                                </Form.Item>
                              }
                            />
                          </Form.Item>
                        )
                      })}

                      <div className="flex justify-between">
                        <Button
                          size="large"
                          icon={<PlusOutlined />}
                          onClick={add}
                        >
                          Add More
                        </Button>
                        <Button
                          type="primary"
                          size="large"
                          className="bg-purple-500"
                          loading={isLoading}
                        >
                          Send Invites
                        </Button>
                      </div>
                    </>
                  )
                }}
              </Form.List>
            </Card>
          </div>

          <div className="flex justify-center ">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="m-auto bg-purple-500 w-80"
            >
              <span>Proceed</span>

              <ArrowRightOutlined />
            </Button>
          </div>
          <p className="mt-8 text-sm text-center text-gray-500 text-normal">
            I&apos;ll do it later
          </p>
        </Form>
      </div>
    </div>
  )
}
