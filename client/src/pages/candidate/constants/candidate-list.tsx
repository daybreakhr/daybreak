import type { ColumnsType } from 'antd/es/table'

export type Candidates = {
  key: string
  candidatename: string
  location: string
  totalexperience: string
  ctc: string
  currentcompany: string
  education: string
}

export const sampleData: Candidates[] = [
  {
    key: '1',
    candidatename: 'Sumit Kumar',
    location: 'Bangalore',
    totalexperience: '3 years',
    ctc: '10 LPA',
    currentcompany: 'Deloitte',
    education: 'B.Tech',
  },
  {
    key: '2',
    candidatename: 'Jose Thomas',
    location: 'Chennai',
    totalexperience: '5 years',
    ctc: '28 LPA',
    currentcompany: 'JP Morgan',
    education: 'MBA',
  },
  {
    key: '3',
    candidatename: 'Roshan Jain',
    location: 'Mumbai',
    totalexperience: '2 years',
    ctc: '7 LPA',
    currentcompany: 'SAP Labs',
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
    title: 'Total Experience',
    dataIndex: 'totalexperience',
    key: 'totalexperience',
  },
  { title: 'CTC', dataIndex: 'ctc', key: 'ctc' },
  {
    title: 'Current Company',
    dataIndex: 'currentcompany',
    key: 'currentcompany',
  },
  {
    title: 'Highest Education',
    dataIndex: 'education',
    key: 'education',
  },
]
