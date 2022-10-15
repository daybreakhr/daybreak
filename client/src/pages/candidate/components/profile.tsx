import { Button } from 'antd'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { sampleData } from '../constants/profile-list'
import Certifications from './certifications'
import Education from './education'
import Experiences from './experiences'
import Score from './score'
import Skills from './skills'

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

      <div className="flex items-start mb-4 space-x-4">
        <div className="flex flex-col flex-1 space-y-4">
          <Experiences />
          <Education />

          <div className="flex justify-between p-4 text-gray-800 bg-white rounded-md shadow-md">
            <p className="text-lg font-semibold">View Feedbacks</p>
            <Button type="primary">Feedback</Button>
          </div>
        </div>

        <div className="flex flex-col flex-1 space-y-4">
          <Score />
          <Certifications />
          <Skills />
        </div>
      </div>
    </>
  )
}
