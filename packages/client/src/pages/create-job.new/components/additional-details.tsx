import { Form, Select, DatePicker, Input, Space } from 'antd'

import { defaultCurrency, jobPriority } from '../constants/create-job-values'

export default function AdditionalDetails() {
  return (
    <div className="px-5 py-5 my-4 rounded-md bg-gray-5">
      <p className="mb-2 text-base font-semibold">Additional Details</p>
      <div className="flex space-x-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Hire by</p>

          <Form.Item name="onsite-coding">
            <DatePicker
              size="large"
              placeholder="Onsite Coding"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Priority</p>

          <Form.Item name="priority">
            <Select
              size="large"
              placeholder="Select Priority"
              options={jobPriority}
            />
          </Form.Item>
        </div>
      </div>

      <div className="flex space-x-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Salary</p>

          <div className="grid grid-flow-col grid-rows-1 gap-4">
            <div>
              <Form.Item>
                <Select
                  size="large"
                  defaultValue={defaultCurrency}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item>
                <Space.Compact size="large">
                  <Input style={{ width: '40%' }} placeholder="min" />
                  <Input
                    style={{ width: '20%', textAlign: 'center' }}
                    size="large"
                    placeholder="to"
                    disabled
                  />

                  <Input style={{ width: '40%' }} placeholder="max" />
                </Space.Compact>{' '}
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Referal Bonus</p>

          <Form.Item>
            <Input size="large" placeholder="max" />
          </Form.Item>
        </div>
      </div>
    </div>
  )
}
