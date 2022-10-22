export type CandidateInfo = {
  key: string
  name: string
  firstname: string
  lastname: string
  location: string
  gender: string
  totalExperience: number
  dob: string
  coverletter: string
  experiences: { company: string; role: string; duration: string }[]
  education: { name: string; course: string; duration: string }[]
  certification: { name: string; issued: string; expiration: string }[]
  skills: { name: string }[]
}

export const sampleData: CandidateInfo = {
  key: '1',
  name: 'Rahul Kumar',
  firstname: 'Rahul',
  lastname: 'Kumar',
  location: 'Pune',
  gender: 'Male',
  totalExperience: 8,
  dob: 'July 07, 1995 (27 yrs old)',
  coverletter:
    'Having recently finished a 2-year contract in software development after completing my Bachelor of Science in Computer Science, I am ready to start the next chapter in my life. So, I was thrilled when I came across your job post in search of IT candidates in software engineering. With both my educational and professional background in the entire software dev life cycle, I believe I have what it takes to be the perfect choice for Cyber Science Tech. As an IT specialist focusing on delivering top results in systems and software development, I know I have also worked on xys dklsfjafj sample test text.',
  experiences: [
    {
      company: 'Infosys',
      role: 'Senior Software Engineer',
      duration: 'Apr 2019 - Jun 2021',
    },
    {
      company: 'Wipro',
      role: 'Software Engineer',
      duration: 'Oct 2017 - Mar 2019',
    },
  ],
  education: [
    {
      name: 'Sample Institute of Technology',
      course: 'B.Tech CSc',
      duration: '2013 - 2017',
    },
    {
      name: 'Sample  2 Institute of Technology',
      course: 'M.Tech CSc',
      duration: '2017 - 20179',
    },
  ],
  certification: [
    {
      name: 'AWS Associate Certification',
      issued: 'Apr 2022',
      expiration: 'Apr 2024',
    },
    {
      name: 'Xilinx Zynq Ultrascale',
      issued: 'Jun 2020',
      expiration: 'No Expiration Date',
    },
  ],
  skills: [
    { name: 'Java Platform Enterprise Edition' },
    { name: 'C++' },
    { name: 'Python' },
    { name: 'JavaScript' },
    { name: 'React' },
    { name: 'Angular' },
  ],
}
