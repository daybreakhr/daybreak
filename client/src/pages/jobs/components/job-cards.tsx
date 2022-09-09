import { Card, Col, Row } from 'antd'
import {
  AiOutlineCarryOut,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
  AiOutlineSolution,
} from 'react-icons/ai'

export default function jobCards() {
  return (
    <div className="p-4 m-8">
      <Row gutter={12}>
        <Col span={6}>
          <div className="pl-4 bg-white rounded-md shadow-md">
            <Card
              title="Active Jobs"
              headStyle={{
                color: 'rgba(0, 0, 0, 0.7',
                border: 0,
              }}
              bordered={false}
            >
              <div className="flex">
                <div className="flex flex-col -mt-6 text-gray-600">
                  <span className="text-2xl font-medium">2</span>
                  <span className="text-sm">Total Jobs</span>
                </div>
                <div className="flex-1 -mt-10">
                  <AiOutlineInfoCircle className="float-right p-1 text-4xl text-blue-700 bg-blue-100 rounded-md" />
                </div>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className="pl-4 bg-white rounded-md shadow-md">
            <Card
              title="Jobs With Process Today"
              headStyle={{
                color: 'rgba(0, 0, 0, 0.7)',
                border: 0,
              }}
              bordered={false}
            >
              <div className="flex">
                <div className="flex flex-col -mt-6 text-gray-600">
                  <span className="text-2xl font-medium">0</span>
                  <span className="text-sm">Last week analytics</span>
                </div>
                <div className="flex-1 -mt-10">
                  <AiOutlineCarryOut className="float-right p-1 text-4xl text-green-700 bg-green-100 rounded-md" />
                </div>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className="pl-4 bg-white rounded-md shadow-md">
            <Card
              title="Jobs Assigned To Me"
              headStyle={{
                color: 'rgba(0, 0, 0, 0.7)',
                border: 0,
              }}
              bordered={false}
            >
              <div className="flex">
                <div className="flex flex-col -mt-6 text-gray-600">
                  <span className="text-2xl font-medium">2</span>
                  <span className="text-sm">Last week analytics</span>
                </div>
                <div className="flex-1 -mt-10">
                  <AiOutlineSolution className="float-right p-1 text-4xl text-orange-700 bg-orange-100 rounded-md" />
                </div>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className="pl-4 bg-white rounded-md shadow-md">
            <Card
              title="High Priority Jobs"
              headStyle={{
                color: 'rgba(0, 0, 0, 0.7)',
                border: 0,
              }}
              bordered={false}
            >
              <div className="flex">
                <div className="flex flex-col -mt-6 text-gray-600">
                  <span className="text-2xl font-medium">1</span>
                  <span className="text-sm">Last week analytics</span>
                </div>
                <div className="flex-1 -mt-10">
                  <AiOutlineExclamationCircle className="float-right p-1 text-4xl text-red-700 bg-red-100 rounded-md" />
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}
