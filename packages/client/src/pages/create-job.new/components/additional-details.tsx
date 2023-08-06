import { Form, Select, DatePicker, Input, Space } from 'antd'

import {
  currency_list,
  defaultCurrency,
  jobPriority,
} from '../constants/create-job-values'

export default function AdditionalDetails() {
  return (
    <div className="px-5 py-5 my-4 rounded-md bg-gray-5">
      <p className="mb-2 text-base font-semibold">Additional Details</p>
      <div className="flex space-x-8">
        <div className="flex-1">
          <p className="mb-1 font-semibold">Hire by</p>

          <Form.Item name="hireBy">
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

          <div className="flex space-x-4">
            <div className="w-30">
              <Form.Item name="currency">
                <Select
                  size="large"
                  defaultValue={defaultCurrency}
                  options={currency_list}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item name="salaryRange">
                <Space.Compact size="large">
                  <Input placeholder="min" />
                  <Input
                    className="text-center cursor-default w-[30%]"
                    size="large"
                    placeholder="to"
                    disabled
                  />

                  <Input placeholder="max" />
                </Space.Compact>
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <p className="mb-1 font-semibold">Referal Bonus</p>

          <Form.Item name="referalBonus">
            <Input size="large" placeholder="max" />
          </Form.Item>
        </div>
      </div>
    </div>
  )
}
