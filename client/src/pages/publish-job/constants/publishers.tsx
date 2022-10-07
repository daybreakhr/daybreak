import { LinkedinFilled } from '@ant-design/icons'

export const publishers = [
  {
    logo: (
      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-gray-600 rounded-lg">
        <span>D</span>
      </div>
    ),
    comingSoon: false,
    title: 'Careers Portal',
    description: 'Publish on your company career portal managed by Daybreak',
  },
  {
    logo: <LinkedinFilled className="text-3xl" />,
    comingSoon: true,
    title: 'LinkedIn',
    description:
      'Manage your professional identity. Build and engage with your professional network. Access knowledge, insights and opportunities.',
  },
  {
    logo: (
      <img
        className="w-8 h-8 rounded-md"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyyzQHcynhaqFp-xidZnibr4pNuY9P8vOHfmcoy7bCqw&s"
      />
    ),
    comingSoon: true,
    title: 'Internshala',
    description:
      "Finding and applying for internships and fresher jobs that you want is now even easier with Internshala's free app for students and freshers.",
  },
  {
    logo: (
      <img
        className="w-8 h-8"
        src="https://static.naukri.com/s/4/100/i/naukriLogoIcon200.png"
      />
    ),
    comingSoon: true,
    title: 'Naukri',
    description:
      "Connect with 20000+ employers. Apply to millions of job opportunities across top companies, industries and locations on India's No.1 jo site. Apply online.",
  },
]
