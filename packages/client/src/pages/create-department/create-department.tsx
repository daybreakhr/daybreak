import { ArrowRightOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, message } from 'antd'
import { addDepartment } from 'pages/organisation/queries'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Show } from 'ui-kit'
import { ReactComponent as TimesIcon } from '../../assets/icons/Times.svg'

export default function CreateDepartment() {
  const [form] = Form.useForm()
  const [selectedValue, setSelectedValue] = useState<string[]>([])
  const departmentNameValue = Form.useWatch('departmentName', form)

  const addItem = () => {
    setSelectedValue([...selectedValue, departmentNameValue])
    form.resetFields(['departmentName'])
  }

  const { mutateAsync: createDepartment } = useMutation(addDepartment)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit() {
    setIsLoading(true)
    Promise.all(
      selectedValue.map((department) => createDepartment({ name: department })),
    )
      .then(() => {
        setIsLoading(false)
        navigate('/onboarding/locations')
      })
      .catch(() => {
        message.error('Something went wrong!')
        setIsLoading(false)
      })
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
                noStyle
              >
                <Input
                  size="large"
                  suffix={
                    <Button
                      type="text"
                      block
                      onClick={() => {
                        if (departmentNameValue === undefined) return
                        addItem()
                      }}
                    >
                      Add
                    </Button>
                  }
                />
              </Form.Item>

              <Show when={selectedValue.length > 0}>
                <p className="mt-8 text-sm font-medium text-gray-500">
                  Added Departments ({selectedValue.length})
                </p>
              </Show>

              <div className="mt-4">
                {selectedValue.map((value: any, index: any) => {
                  return (
                    <div
                      className="flex justify-between px-3 py-2 mt-3 border rounded-md border-gray-50 bg-gray-5 "
                      key={index}
                    >
                      <div>{value}</div>
                      <div className="pt-1 cursor-pointer">
                        <TimesIcon
                          onClick={() => {
                            const index = selectedValue.indexOf(value)
                            if (index > -1) {
                              selectedValue.splice(index, 1)
                            }
                            setSelectedValue([...selectedValue])
                          }}
                        />
                      </div>
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
              className="m-auto w-80"
              onClick={handleSubmit}
              loading={isLoading}
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
