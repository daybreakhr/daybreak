import { Tag } from 'antd'
import { sampleData } from '../constants/profile-list'

export default function Skills() {
  return (
    <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="mb-4 text-lg font-semibold">Skills</p>
      <div className="flex flex-wrap">
        {sampleData.skills.map(({ name }) => (
          <div key={name} className="mb-2">
            <Tag>{name}</Tag>
          </div>
        ))}
      </div>
    </div>
  )
}
