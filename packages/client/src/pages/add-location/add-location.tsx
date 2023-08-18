import {
  ArrowRightOutlined,
  CloseOutlined,
  EnvironmentFilled,
} from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { addLocation } from 'pages/organisation/queries'
import { Button, Form, Input, message } from 'antd'
import { useState } from 'react'
import { Card } from 'ui-kit'

export default function AddLocation() {
  const [form] = Form.useForm()
  const [selectedValue, setSelectedValue] = useState<string[]>([])

  const { mutateAsync: createLocation } = useMutation(addLocation)
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')

  const onNameChange = (event: any) => {
    setName(event.target.value)
  }

  const addItem = () => {
    setSelectedValue([...selectedValue, name])
    setName('')
  }

  function handleSubmit() {
    setIsLoading(true)
    Promise.all(
      selectedValue.map((location) => createLocation({ name: location })),
    )
      .then(() => {
        setIsLoading(false)
        // navigate('/onboarding/invite')
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
          <p className="mb-2 text-2xl font-semibold">Add Locations</p>
          <p className="text-base text-gray-500">
            Take a moment to add your company&apos;s locations you&apos;ll be
            hiring for. You can always edit or add more locations later.
          </p>
        </div>
        <Form layout="vertical" form={form}>
          <div className="py-12">
            <Card className="px-10 py-10">
              <p className="mb-1 font-semibold">
                Location<sup className="text-sm text-red-500 ">*</sup>
              </p>
              <Form.Item
                name="location"
                rules={[{ required: true, message: 'Search Location' }]}
              >
                <Input
                  value={name}
                  size="large"
                  onChange={onNameChange}
                  suffix={
                    <Button
                      type="text"
                      block
                      onClick={() => {
                        if (name === '') return
                        addItem()
                      }}
                    >
                      Add
                    </Button>
                  }
                />
              </Form.Item>

              <p className="mt-8 text-sm font-medium text-gray-500">
                Added Locations
              </p>

              <div className="mt-4">
                {selectedValue.map((value: any, index: any) => {
                  return (
                    <div
                      className="flex justify-between px-3 py-2 mt-3 border rounded-md border-gray-50 bg-gray-5 "
                      key={index}
                    >
                      <div>
                        <EnvironmentFilled
                          style={{ fontSize: '14px' }}
                          className="text-gray-400"
                        />
                        <span className="ml-4">{value}</span>
                      </div>

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
              onClick={handleSubmit}
              loading={isLoading}
            >
              <span>Proceed</span>

              <ArrowRightOutlined />
            </Button>
          </div>
          <p className="flex justify-center mt-8 text-sm font-medium text-gray-500">
            I&apos;ll do this later
          </p>
        </Form>
      </div>
    </div>
  )
}
