import { Card, Col, Row } from 'antd'

export default function jobCards() {
  return (
    <div className="m-8 p-4">
      <Row gutter={12}>
        <Col span={6}>
          <div className="bg-white rounded-md shadow-md pl-4">
            <Card
              title="Active Jobs"
              headStyle={{
                color: 'rgba(0, 0, 0, 0.5)',
                border: 0,
              }}
              bordered={false}
            >
              <div className="text-gray-500 -mt-6 flex flex-col">
                <span className="text-2xl font-medium">5</span>
                <span className="text-sm">Total Jobs</span>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className="bg-white rounded-md shadow-md pl-4">
            <Card
              title="Jobs With Process Today"
              headStyle={{
                color: 'rgba(0, 0, 0, 0.5)',
                border: 0,
              }}
              bordered={false}
            >
              <div className="text-gray-500 -mt-6 flex flex-col">
                <span className="text-2xl font-medium">3</span>
                <span className="text-sm">Last week analytics</span>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className="bg-white rounded-md shadow-md pl-4">
            <Card
              title="Jobs Assigned To Me"
              headStyle={{
                color: 'rgba(0, 0, 0, 0.5)',
                border: 0,
              }}
              bordered={false}
            >
              <div className="text-gray-500 -mt-6 flex flex-col">
                <span className="text-2xl font-medium">2</span>
                <span className="text-sm">Last week analytics</span>
              </div>
            </Card>
          </div>
        </Col>
        <Col span={6}>
          <div className="bg-white rounded-md shadow-md pl-4">
            <Card
              title="High Priority Jobs"
              headStyle={{
                color: 'rgba(0, 0, 0, 0.5)',
                border: 0,
              }}
              bordered={false}
            >
              <div className="text-gray-500 -mt-6 flex flex-col">
                <span className="text-2xl font-medium">1</span>
                <span className="text-sm">Last week analytics</span>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  )
}
