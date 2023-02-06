import { useState } from 'react'
import { union } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { RightOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { useMutation } from '@tanstack/react-query'

import { addDepartment, addLocation } from 'pages/organisation/queries'

type FormValue = {
  departments: { department: string }[]
  locations: { location: string }[]
}
export default function SetupWorkspace() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const { mutateAsync: createLocation } = useMutation(addLocation)
  const { mutateAsync: createDepartment } = useMutation(addDepartment)

  function handleSubmit(values: FormValue) {
    setIsLoading(true)
    Promise.all(
      union(
        values.departments.map(({ department }) =>
          createDepartment({ name: department }),
        ),
        values.locations.map(({ location }) =>
          createLocation({ name: location }),
        ),
      ),
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
    <div className="flex flex-col items-center w-full pt-[16vh] overflow-y-auto">
      <div className="w-full max-w-4xl mb-6">
        <p className="text-xl font-medium text-gray-700">
          Create Departments and Locations for your Company
        </p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="grid w-full max-w-4xl grid-cols-3 gap-4"
        initialValues={{ departments: [''], locations: [''] }}
      >
        <div>
          <p className="text-lg font-medium text-gray-700">Departments</p>
          <p className="text-gray-500">
            Create Departments for which you would like to create job openings
          </p>
        </div>

        <div className="col-span-2">
          <Form.List name="departments">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div className="flex items-center space-x-2" key={key}>
                    <Form.Item
                      {...restField}
                      className="flex-1"
                      name={[name, 'department']}
                      rules={[
                        { required: true, message: 'Enter department name' },
                      ]}
                    >
                      <Input placeholder="Enter department name. eg. Engineering, Business" />
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
                ))}
              </>
            )}
          </Form.List>
        </div>

        <hr className="w-full col-span-3 my-6" />

        <div>
          <p className="text-lg font-medium text-gray-700">Locations</p>
          <p className="text-gray-500">
            Add office locations for which you would like to hire
          </p>
        </div>

        <div className="col-span-2">
          <Form.List name="locations">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div className="flex items-center space-x-2" key={key}>
                    <Form.Item
                      {...restField}
                      className="flex-1"
                      name={[name, 'location']}
                      rules={[
                        { required: true, message: 'Enter location name' },
                      ]}
                    >
                      <Input placeholder="Enter location name. eg. Bangalore, SF California, London" />
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
                ))}
              </>
            )}
          </Form.List>
        </div>

        <Form.Item className="col-span-3">
          <div className="flex items-center justify-end space-x-4">
            <Button onClick={() => navigate('/onboarding/invite')}>Skip</Button>
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
