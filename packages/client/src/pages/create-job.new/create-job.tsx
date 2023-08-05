import { Form } from 'antd'

import Stepper from './components/stepper'

import JobDetails from './containers/job-details'

export default function CreateJob() {
  const [form] = Form.useForm()

  return (
    <div className="flex flex-col h-full py-12 overflow-scroll bg-white ">
      <Form layout="vertical" form={form} className="w-full max-w-4xl mx-auto">
        <Stepper />
        <Form.Item>
          <JobDetails form={form} />
        </Form.Item>
      </Form>
    </div>
  )
}
