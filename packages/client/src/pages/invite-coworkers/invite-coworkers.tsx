import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
import { useState } from 'react'
import { Card } from 'ui-kit'

export default function InviteCoworkers() {
  const [addInput, setAddInput] = useState([0])
  const { Option } = Select

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
          // form={form}
          // onFinish={(createWorkspaceDto) => mutate({ createWorkspaceDto })}
        >
          <div className="py-12">
            <Card className="px-8 py-8 w-[698px]">
              <p className="mb-1 font-semibold">Email</p>

              {addInput.map((index) => {
                return (
                  <Form.Item name="email" key={index}>
                    <Input
                      size="large"
                      placeholder="email@example.com"
                      addonAfter={
                        <Form.Item name="email" noStyle>
                          <Select placeholder="Role" bordered={false}>
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
                  onClick={() => {
                    addInput.push(addInput.length)
                    setAddInput([...addInput])
                  }}
                >
                  Add More
                </Button>
                <Button type="primary" size="large" className="bg-purple-500">
                  Send Invites
                </Button>
              </div>
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
