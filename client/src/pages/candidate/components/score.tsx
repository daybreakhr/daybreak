import { Progress } from 'antd'

export default function Score() {
  return (
    <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="mb-4 text-lg font-semibold">Quality Score</p>
      <div className="flex items-center justify-center">
        <Progress type="dashboard" strokeColor="#52c41a" percent={75} />
      </div>
    </div>
  )
}
