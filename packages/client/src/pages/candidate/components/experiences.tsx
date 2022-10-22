import { Avatar } from 'antd'
import { sampleData } from '../constants/profile-list'

export default function Experiences() {
  return (
    <div className="p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="mb-4 text-lg font-semibold">Experiences</p>
      <ul>
        {sampleData.experiences.map(({ company, role, duration }) => (
          <li key={company} className="mb-4">
            <div className="flex items-start space-x-3">
              <Avatar>{company[0]}</Avatar>
              <div>
                <p className="font-medium">{company}</p>
                <p className="text-sm text-gray-800">{role}</p>
              </div>
              <div className="flex-1" />
              <p className="text-gray-500">{duration}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
