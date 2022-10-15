import { AiOutlineCloudDownload } from 'react-icons/ai'
import { Avatar, Button, Progress } from 'antd'
import { sampleData } from '../constants/profile-list'

export default function Profile() {
  return (
    <>
      <div className="p-4 mb-4 text-gray-800 bg-white shadow-md rounded-b-md">
        <p className="mb-4 text-lg font-semibold">Personal Details</p>
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs text-gray-800 uppercase">Name</p>
                <p className="font-medium">{sampleData.name}</p>
              </div>

              <div>
                <p className="text-xs text-gray-800 uppercase">Location</p>
                <p className="font-medium">{sampleData.location}</p>
              </div>

              <div>
                <p className="text-xs text-gray-800 uppercase">Gender</p>
                <p className="font-medium">{sampleData.gender}</p>
              </div>

              <div>
                <p className="text-xs text-gray-800 uppercase">
                  Total Experience
                </p>
                <p className="font-medium">
                  {sampleData.totalExperience} Years
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img src="/assets/pdf.png" className="w-12 mr-4" />

            <a className="pl-2 text-base font-medium text-blue-600">
              <AiOutlineCloudDownload className="text-xl" />
              Resume.pdf
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center mb-4 space-x-4">
        <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
          <p className="mb-4 text-lg font-semibold">Experiences</p>
          <div className="ml-8">
            <ul className="list-disc">
              {sampleData.experiences.map(({ company, role, duration }) => (
                <li key={company} className="mb-4">
                  <div className="flex items-center">
                    <Avatar
                      size={'small'}
                      style={{ backgroundColor: '#2c2c2c' }}
                    >
                      {company[0]}
                    </Avatar>
                    <p className="px-2 text-lg font-medium">{company}</p>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <p className="text-sm text-gray-800">{role}</p>
                    <p className="text-sm text-gray-500">{duration}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
          <p className="mb-4 text-lg font-semibold">Quality Score</p>
          <div className="flex items-center justify-center">
            <Progress type="dashboard" strokeColor="#52c41a" percent={75} />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
          <p className="mb-4 text-lg font-semibold">Educations</p>
          <div className="ml-8">
            <ul className="list-disc">
              {sampleData.education.map(({ name, duration }) => (
                <li key={name} className="mb-5">
                  <p className="font-normal">{name}</p>
                  <p className="text-sm text-gray-500">{duration}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
          <p className="mb-4 text-lg font-semibold">Certifications</p>
          <div className="ml-8">
            <ul className="list-disc">
              {sampleData.certification.map(({ name, issued, expiration }) => (
                <li key={name} className="mb-4">
                  <div className="flex items-center">
                    <Avatar
                      size={'small'}
                      style={{ backgroundColor: '#2c2c2c' }}
                    >
                      {name[0]}
                    </Avatar>
                    <p className="px-2 text-lg font-medium">{name}</p>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <p className="text-sm text-gray-800">Issued: {issued}</p>
                    <p className="text-sm text-gray-500">
                      Expires: {expiration}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 space-y-4">
        <div className="flex justify-between flex-1 p-4 mt-4 text-gray-800 bg-white rounded-md shadow-md">
          <p className="mb-4 text-lg font-semibold">View Feedbacks</p>
          <Button type="primary" style={{ background: '#9155FD' }}>
            Feedback
          </Button>
        </div>

        <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
          <p className="mb-4 text-lg font-semibold">Skills</p>
          <div className="ml-8">
            <ul className="list-disc">
              {sampleData.skills.map(({ name }) => (
                <li key={name} className="mb-2">
                  <div className="flex items-center">
                    <p className="px-2 text-base font-medium">{name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
