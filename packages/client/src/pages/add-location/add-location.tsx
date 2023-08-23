import { useMutation } from '@tanstack/react-query'
import { addLocation } from 'pages/organisation/queries'
import { Button, Form, Input, message } from 'antd'
import { useState } from 'react'
import { Card, Show } from 'ui-kit'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { ReactComponent as LocationIcon } from '../../assets/icons/location-dot.svg'
import { ReactComponent as TimesIcon } from '../../assets/icons/Times.svg'

export default function AddLocation() {
  const [form] = Form.useForm()
  const [selectedValue, setSelectedValue] = useState<string[]>([])
  const locationValue = Form.useWatch('location', form)

  const { mutateAsync: createLocation } = useMutation(addLocation)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const addItem = () => {
    setSelectedValue([...selectedValue, locationValue])
    form.resetFields(['location'])
  }

  function handleSubmit() {
    setIsLoading(true)
    Promise.all(
      selectedValue.map((location) => createLocation({ name: location })),
    )
      .then(() => {
        setIsLoading(false)
        navigate('/onboarding/invite')
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
            <Card className="px-10 py-10 ">
              <p className="mb-1 font-semibold">
                Location<sup className="text-sm text-red-500 ">*</sup>
              </p>
              <Form.Item
                name="location"
                rules={[{ required: true, message: 'Search Location' }]}
              >
                <Input
                  size="large"
                  suffix={
                    <Button
                      type="text"
                      block
                      onClick={() => {
                        if (locationValue === undefined) return
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
                  Added Locations ({selectedValue.length})
                </p>
              </Show>

              <div>
                {selectedValue.map((value: any, index: any) => {
                  return (
                    <div
                      className="w-[430px] h-[38px] px-3 py-2 mt-3 bg-gray-5 rounded-md border border-gray-200 justify-start items-center gap-4 inline-flex"
                      key={index}
                    >
                      <div className="self-stretch rounded-md flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="self-stretch text-sm font-black leading-tight tracking-tight text-center text-gray-400">
                          <LocationIcon />
                        </div>
                      </div>
                      <div className="text-sm font-normal leading-snug grow shrink basis-0 ">
                        {value}
                      </div>
                      <div className="self-stretchp-2.5 rounded-md flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="self-stretch text-sm font-black leading-tight tracking-tight text-center text-gray-400 cursor-pointer">
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
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
          <div className="flex justify-center px-5 py-3 ">
            <Button
              type="primary"
              size="large"
              className="m-auto w-[336px] bg-primary-500"
              onClick={handleSubmit}
              loading={isLoading}
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
            onClick={() => navigate('/onboarding/invite')}
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
