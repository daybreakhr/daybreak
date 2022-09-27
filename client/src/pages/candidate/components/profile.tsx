import { Typography } from 'antd'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { sampleData } from '../constants/profile-list'

export default function Profile() {
  return (
    <div className="p-4 text-gray-800">
      <p className="text-lg font-semibold mb-4">Personal Details</p>
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-gray-400 text-xs uppercase">First Name</p>
              <p className="font-medium">{sampleData.firstname}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Last Name</p>
              <p className="font-medium">{sampleData.lastname}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase">Gender</p>
              <p className="font-medium">{sampleData.gender}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Date of Birth</p>
              <p className="font-medium">{sampleData.dob}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center place-items-center">
          <img src="/assets/pdf.png" className="mr-4 w-12" />

          <a className="pl-2 text-base font-medium text-blue-600">
            <AiOutlineCloudDownload className="text-xl" />
            Resume.pdf
          </a>
        </div>
      </div>

      <hr className="my-4" />

      <p className="text-lg font-semibold mb-4">Cover Letter</p>
      <Typography.Paragraph
        className="pb-2"
        editable
        ellipsis={{ rows: 3, expandable: true, symbol: 'Read More' }}
      >
        {sampleData.coverletter}
      </Typography.Paragraph>

      <hr className="my-4" />

      <p className="text-lg font-semibold mb-4">Experience</p>
      <div className="ml-8">
        <ul className="list-disc">
          {sampleData.experiences.map(({ role, duration }) => (
            <li key={role} className="mb-4">
              <p className="font-normal">{role}</p>
              <p className="text-sm text-gray-500">{duration}</p>
            </li>
          ))}
        </ul>
      </div>

      <hr className="my-4" />

      <p className="text-lg font-semibold mb-4">Education</p>
      <div className="ml-8">
        <ul className="list-disc">
          <li className="mb-5">
            <p className="font-normal">{sampleData.education}</p>
            <p className="text-sm text-gray-500">
              {sampleData.educationduration}
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
