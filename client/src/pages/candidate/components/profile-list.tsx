export type CandidateInfo = {
  key: string
  firstname: string
  lastname: string
  gender: string
  dob: string
  coverletter: string
  experience: string
  experienceduration: string
  education: string
  educationduration: string
}

export const sampleData: CandidateInfo[] = [
  {
    key: '1',
    firstname: 'Rahul',
    lastname: 'Kumar',
    gender: 'Male',
    dob: 'July 07, 1995 (27 yrs old)',
    coverletter:
      ' Having recently finished a 2-year contract in software development after completing my Bachelor of Science in Computer Science, I am ready to start the next chapter in my life. So, I was thrilled when I came across your job post in search of IT candidates in software engineering. With both my educational and professional background in the entire software dev life cycle, I believe I have what it takes to be the perfect choice for Cyber Science Tech. As an IT specialist focusing on delivering top results in systems and software development, I know I have also worked on xys dklsfjafj sample test text.',
    experience: 'Front End Developer at Infosys',
    experienceduration: 'April 2019 - June 2021 ( 2 Years 3 Months )',
    education: 'Sample Institute of Technology, Sample City',
    educationduration: '2015 - 2019',
  },
]
