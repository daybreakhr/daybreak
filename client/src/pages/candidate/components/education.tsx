import { sampleData } from '../constants/profile-list'

export default function Education() {
  return (
    <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="mb-4 text-lg font-semibold">Educations</p>
      <ul className="space-y-4">
        {sampleData.education.map(({ name, course, duration }) => (
          <li key={name} className="flex items-start justify-between">
            <div>
              <p className="font-normal">{name}</p>
              <p className="text-gray-500">{course}</p>
            </div>
            <p className="text-gray-500">{duration}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
