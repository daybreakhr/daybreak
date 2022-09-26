import { Divider, Image, Typography } from 'antd'
import { AiOutlineCloudDownload } from 'react-icons/ai'

export default function Profile() {
  return (
    <div className="p-4 text-[#2c2c2c]">
      <p className="text-lg font-semibold ">Personal Details</p>
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="col-span-2 ">
          <div className="grid grid-cols-2 gap-5">
            <div className="ml-4">
              <div>First Name</div>
              <div className="text-base font-medium">Kanit</div>
            </div>
            <div>
              <div>Last Name</div>
              <div className="text-base font-medium">Mann</div>
            </div>

            <div className="ml-4">
              <div>Gender</div>
              <div className="text-base font-medium">Male</div>
            </div>
            <div>
              <div>Date of Birth</div>
              <div className="text-base font-medium">
                July 07, 1995 (27 yrs old)
              </div>
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

      <Divider />

      <p className="text-lg font-semibold">Cover Letter</p>

      <Typography.Paragraph
        editable
        ellipsis={{ rows: 3, expandable: true, symbol: 'Read More' }}
      >
        Having recently finished a 2-year contract in software development after
        completing my Bachelor of Science in Computer Science, I am ready to
        start the next chapter in my life. So, I was thrilled when I came across
        your job post in search of IT candidates in software engineering. With
        both my educational and professional background in the entire software
        dev life cycle, I believe I have what it takes to be the perfect choice
        for Cyber Science Tech. As an IT specialist focusing on delivering top
        results in systems and software development, I know I have also worked
        on xys dklsfjafj sample test text.
      </Typography.Paragraph>

      <Divider />

      <p className="text-lg font-semibold">Experience</p>
      <div className="ml-10">
        <ul className="list-disc">
          <li className="mb-5">
            <div className="text-base font-normal">
              Front End Developer at Infosys
            </div>
            <div className="text-sm text-gray-500">
              April 2019 - June 2021 ( 2 Years 3 Months )
            </div>
          </li>
          <li className="mb-5">
            <div className="text-base font-normal">
              Front End Developer at Wipro
            </div>
            <div className="text-sm text-gray-500">
              April 2016 - June 2018 ( 2 Years 3 Months )
            </div>
          </li>
        </ul>
      </div>

      <Divider />
      <p className="text-lg font-semibold">Education</p>
      <div className="ml-10">
        <ul className="list-disc">
          <li className="mb-5">
            <div className="text-base font-normal">
              Sample Institute of Technology, Sample City
            </div>
            <div className="text-sm text-gray-500">2012 - 2016 </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
