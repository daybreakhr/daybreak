import { AiOutlineCloudDownload } from 'react-icons/ai'
import { sampleData } from '../constants/profile-list'

export default function Profile() {
  return (
    <>
      <div className="p-4 bg-white text-gray-800 rounded-b-md shadow-md mb-4">
        <p className="text-lg font-semibold mb-4">Personal Details</p>
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-gray-400 text-xs uppercase">Name</p>
                <p className="font-medium">{sampleData.name}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase">Location</p>
                <p className="font-medium">{sampleData.location}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase">Location</p>
                <p className="font-medium">{sampleData.location}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase">
                  Total Experience
                </p>
                <p className="font-medium">
                  {sampleData.totalExperience} Years
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img src="/assets/pdf.png" className="mr-4 w-12" />

            <a className="pl-2 text-base font-medium text-blue-600">
              <AiOutlineCloudDownload className="text-xl" />
              Resume.pdf
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <div className="p-4 flex-1 bg-white text-gray-800 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-4">Experiences</p>
        </div>

        <div className="p-4 flex-1 bg-white text-gray-800 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-4">Quality Score</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="p-4 flex-1 bg-white text-gray-800 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-4">Educations</p>
        </div>

        <div className="p-4 flex-1 bg-white text-gray-800 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-4">Certifications</p>
        </div>
      </div>
    </>
  )
}
