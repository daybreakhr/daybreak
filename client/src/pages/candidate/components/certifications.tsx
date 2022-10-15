import { Avatar } from 'antd'
import { sampleData } from '../constants/profile-list'

export default function Certifications() {
  return (
    <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="mb-4 text-lg font-semibold">Certifications</p>
      <ul>
        {sampleData.certification.map(({ name, issued, expiration }) => (
          <li key={name} className="mb-4">
            <div className="flex items-start space-x-3">
              <Avatar>{name[0]}</Avatar>
              <div>
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-800">Issued: {issued}</p>
              </div>
              <div className="flex-1" />
              <p className="text-gray-500">Expires: {expiration}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
