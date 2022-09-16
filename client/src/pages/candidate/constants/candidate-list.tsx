import type { ColumnsType } from 'antd/es/table'

export type Candidates = {
  key: string
  candidatename: string
  location: string
  addedon: string
  totalexperience: string
  ctc: string
  expectedctc: string
  currentrole: string
  currentcompany: string
  noticeperiod: string
  education: string
}

export const sampleData: Candidates[] = [
  {
    key: '1',
    candidatename: 'Sumit Kumar',
    location: 'Bangalore',
    addedon: '14 Apr 2021, 8:43 PM',
    totalexperience: '3 years',
    ctc: '10 LPA',
    expectedctc: '12 LPA',
    currentrole: 'Software Engineer',
    currentcompany: 'Deloitte',
    noticeperiod: '30 days',
    education: 'B.Tech',
  },
  {
    key: '2',
    candidatename: 'Jose Thomas',
    location: 'Chennai',
    addedon: '23 Dec 2021, 5:20 PM',
    totalexperience: '5 years',
    ctc: '28 LPA',
    expectedctc: '32 LPA',
    currentrole: 'Consultant',
    currentcompany: 'JP Morgan',
    noticeperiod: '90 days',
    education: 'MBA',
  },
  {
    key: '3',
    candidatename: 'Roshan Jain',
    location: 'Mumbai',
    addedon: '29 Apr 2022, 10:12 AM',
    totalexperience: '2 years',
    ctc: '7 LPA',
    expectedctc: '10 LPA',
    currentrole: 'R&D Engineer',
    currentcompany: 'SAP Labs',
    noticeperiod: '45 days',
    education: 'BCA',
  },
]

export const candidateColumns: ColumnsType<Candidates> = [
  {
    title: 'Candidate Name',
    dataIndex: 'candidatename',
    key: 'candidatename',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    filters: [
      { text: 'New Delhi', value: 'newdelhi' },
      { text: 'Bangalore', value: 'bangalore' },
      { text: 'Chennai', value: 'chennai' },
      { text: 'Mumbai', value: 'mumbai' },
    ],
  },
  {
    title: 'Added On',
    dataIndex: 'addedon',
    key: 'addedon',
  },
  {
    title: 'Total Experience',
    dataIndex: 'totalexperience',
    key: 'totalexperience',
  },
  { title: 'CTC', dataIndex: 'ctc', key: 'ctc' },
  {
    title: 'Expected CTC',
    dataIndex: 'expectedctc',
    key: 'expectedctc',
  },
  {
    title: 'Current Role',
    dataIndex: 'currentrole',
    key: 'currentrole',
  },
  {
    title: 'Current Company',
    dataIndex: 'currentcompany',
    key: 'currentcompany',
  },
  {
    title: 'Notice Period',
    dataIndex: 'noticeperiod',
    key: 'noticeperiod',
  },
  {
    title: 'Highest Education',
    dataIndex: 'education',
    key: 'education',
  },
]
