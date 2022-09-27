import { Image, Typography } from 'antd'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { sampleData } from './profile-list'

export default function Profile() {
  return (
    <div className="p-4 text-gray-800">
      <p className="text-lg font-semibold">Personal Details</p>
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="col-span-2 ">
          <div className="grid grid-cols-2 gap-5">
            <div className="ml-4">
              <div>First Name</div>
              <div className="text-base font-medium">
                {sampleData[0].firstname}
              </div>
            </div>
            <div>
              <div>Last Name</div>
              <div className="text-base font-medium">
                {sampleData[0].lastname}
              </div>
            </div>

            <div className="ml-4">
              <div>Gender</div>
              <div className="text-base font-medium">
                {sampleData[0].gender}
              </div>
            </div>
            <div>
              <div>Date of Birth</div>
              <div className="text-base font-medium">{sampleData[0].dob}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center place-items-center">
          <div>
            <Image src="/assets/pdf.png" width="3vw" preview={false} />
          </div>
          <a className="pl-2 text-base font-medium text-blue-600">
            <AiOutlineCloudDownload className="text-xl" />
            Resume.pdf
          </a>
        </div>
      </div>

      <hr />

      <p className="text-lg font-semibold mt-4">Cover Letter</p>
      <Typography.Paragraph
        className="pb-2"
        editable
        ellipsis={{ rows: 3, expandable: true, symbol: 'Read More' }}
      >
        {sampleData[0].coverletter}
      </Typography.Paragraph>

      <hr />

      <p className="text-lg font-semibold mt-4">Experience</p>
      <div className="ml-10">
        <ul className="list-disc">
          <li className="mb-5">
            <div className="text-base font-normal">
              {sampleData[0].experience}
            </div>
            <div className="text-sm text-gray-500">
              {sampleData[0].experienceduration}
            </div>
          </li>
          <li className="mb-5">
            <div className="text-base font-normal">
              {sampleData[0].experience}
            </div>
            <div className="text-sm text-gray-500">
              {sampleData[0].experienceduration}
            </div>
          </li>
        </ul>
      </div>

      <hr />
      <p className="text-lg font-semibold mt-4">Education</p>
      <div className="ml-10">
        <ul className="list-disc">
          <li className="mb-5">
            <div className="text-base font-normal">
              {sampleData[0].education}
            </div>
            <div className="text-sm text-gray-500">
              {sampleData[0].educationduration}{' '}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
