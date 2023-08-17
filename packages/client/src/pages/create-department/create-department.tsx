import {
  ArrowRightOutlined,
  CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Divider, Form, Input, Select } from 'antd'
import { useState } from 'react'
import { Card } from 'ui-kit'

export default function CreateDepartment() {
  const [form] = Form.useForm()
  const [selectedValue, setSelectedValue] = useState<string[]>([])

  const { Option } = Select

  const [items, setItems] = useState(['HR', 'Finance'])
  const [name, setName] = useState('')

  const onNameChange = (event: any) => {
    setName(event.target.value)
  }

  const addItem = () => {
    setItems([...items, name])
    setName('')
  }
  return (
    <div className="flex-1 py-10">
      <div className="w-[512px] mx-auto">
        <div className="text-center">
          <p className="mb-2 text-2xl font-semibold">Create Departments</p>
          <p className="text-base text-gray-500">
            We have added the required departments, you can add, remove or
            create departments. You can always update it in your Settings.
          </p>
        </div>
        <Form layout="vertical" form={form}>
          <div className="py-12">
            <Card className="px-10 py-10">
              <p className="mb-1 font-semibold">
                Department Name<sup className="text-sm text-red-500">*</sup>
              </p>
              <Form.Item
                name="departmentName"
                rules={[{ required: true, message: 'Select deparment name' }]}
              >
                <Select
                  size="large"
                  placeholder="Search or create new"
                  onChange={(value) =>
                    setSelectedValue([...selectedValue, value])
                  }
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '4px 0' }} />
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'nowrap',
                          padding: 8,
                        }}
                      >
                        <Input
                          style={{ flex: 'auto' }}
                          value={name}
                          onChange={onNameChange}
                          placeholder="Enter Department Name"
                        />
                        <a
                          style={{
                            flex: 'none',
                            padding: '8px',
                            display: 'block',
                            cursor: 'pointer',
                          }}
                          className="flex-none block pt-2 cursor-pointer"
                          onClick={addItem}
                        >
                          <PlusOutlined /> Add Department
                        </a>
                      </div>
                    </div>
                  )}
                >
                  {items.map((item) => (
                    <Option key={item}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>
              <p className="mt-8 text-sm font-medium text-gray-500">
                Added by Daybreak
              </p>

              <div className="mt-4">
                {selectedValue.map((value: any, index: any) => {
                  return (
                    <div
                      className="flex justify-between px-3 py-2 mt-3 border rounded-md border-gray-50 bg-gray-5 "
                      key={index}
                    >
                      <div>{value}</div>
                      <CloseOutlined
                        style={{ fontSize: '14px' }}
                        onClick={() => {
                          const index = selectedValue.indexOf(value)
                          if (index > -1) {
                            selectedValue.splice(index, 1)
                          }
                          setSelectedValue([...selectedValue])
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="flex justify-center ">
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="m-auto w-80"
            >
              <span>Proceed</span>

              <ArrowRightOutlined />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
