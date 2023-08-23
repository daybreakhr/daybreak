import { Invitees } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Divider, Form, Input, Select, message } from 'antd'
import { fetchMe } from 'components/auth/queries'
import useAuth from 'hooks/use-auth'
import { inviteUser } from 'pages/members/queries'
import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Card } from 'ui-kit'

export default function InviteCoworkers() {
  const [form] = Form.useForm()
  const invitees = Form.useWatch('invitees', form)
  const { Option } = Select
  const navigate = useNavigate()
  const { setMember } = useAuth()
  const [enableMe, setEnableMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  useQuery(['me'], fetchMe, {
    enabled: enableMe,
    onSuccess: (member) => {
      setMember(member)
    },
  })

  const { mutateAsync: addUser } = useMutation(inviteUser)

  function handleSubmit({ invitees }: { invitees: Invitees[] }) {
    setIsLoading(true)

    Promise.all(invitees.map(({ email, role }) => addUser({ email, role })))
      .then(() => {
        setIsLoading(false)
        setEnableMe(true)
        setIsSent(true)
      })
      .catch(() => {
        message.error('Something went wrong!')
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsSent(false)
  }, [invitees])

  return (
    <div className="flex-1 py-32 overflow-hidden">
      <div className="w-[690px] mx-auto">
        <div className="justify-center text-center w-[512px] mx-auto">
          <p className="mb-2 text-2xl font-semibold">
            Invite Co-workers to your hiring team
          </p>
          <p className="text-base text-gray-500 ">
            Build a unified hiring process by inviting your team members to join
            Daybreak. Collaborate on candidate evaluations, feedbacks and
            interviews effortlessly
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          initialValues={{ invitees: ['', '', ''] }}
          onFinish={handleSubmit}
        >
          <div className="py-12">
            <Card className="px-8 py-8 ">
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
                              className="rounded-md"
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
                                    className="w-32"
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

                      <div className="flex justify-between mt-8">
                        <Button size="large" onClick={add}>
                          Add More
                        </Button>
                        <Button
                          type="primary"
                          size="large"
                          loading={isLoading}
                          htmlType="submit"
                          className="px-4 py-2 bg-primary-500"
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

          <div className="flex justify-center px-5 py-3 ">
            <Button
              type="primary"
              size="large"
              className="m-auto w-[336px] bg-primary-500 disabled:bg-primary-300"
              disabled={!isSent}
              onClick={() => {
                navigate('/onboarding/slack')
              }}
            >
              <div className="text-sm font-medium leading-snug text-center text-white">
                Proceed
              </div>
              <div className="ml-4 text-base leading-snug tracking-tight text-center text-white">
                <FaArrowRight />
              </div>
            </Button>
          </div>
          <div
            onClick={() => navigate('/onboarding/slack')}
            className="cursor-pointer"
          >
            <p className="flex justify-center mt-8 text-sm font-medium text-gray-500">
              I&apos;ll do this later
            </p>
          </div>
        </Form>
      </div>
    </div>
  )
}
