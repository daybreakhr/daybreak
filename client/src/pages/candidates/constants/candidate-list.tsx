import type { ColumnsType } from 'antd/es/table'

type Candidate = {
  key: string
  name: string
  appliedFor: string
  applicationDate: string
  currentRole: string
  currentCompany: string
  totalExperience: string
  applicationSource: string
}

export const sampleData: Candidate[] = [
  {
    key: '1',
    name: 'Sumit Kumar',
    appliedFor: 'Senior Software Engineer - Frontend',
    applicationDate: '14 Apr, 2021',
    totalExperience: '3 years',
    currentRole: 'Software Engineer',
    currentCompany: 'Deloitte',
    applicationSource: 'Portal',
  },
  {
    key: '2',
    name: 'Jose Thomas',
    appliedFor: 'Software Engineer - Backend',
    applicationDate: '23 Dec, 2021',
    totalExperience: '5 years',
    currentRole: 'Consultant',
    currentCompany: 'JP Morgan',
    applicationSource: 'Portal',
  },
  {
    key: '3',
    name: 'Roshan Jain',
    appliedFor: 'Product Manager',
    applicationDate: '29 Apr, 2022',
    totalExperience: '2 years',
    currentRole: 'Product Manager',
    currentCompany: 'SAP Labs',
    applicationSource: 'Portal',
  },
]

export const candidateColumns: ColumnsType<Candidate> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Applied For',
    dataIndex: 'appliedFor',
    key: 'appliedFor',
  },
  {
    title: 'Application Date',
    dataIndex: 'applicationDate',
    key: 'applicationDate',
  },
  {
    title: 'Current Role',
    dataIndex: 'currentRole',
    key: 'currentRole',
  },
  {
    title: 'Current Company',
    dataIndex: 'currentCompany',
    key: 'currentCompany',
  },
  {
    title: 'Total Experience',
    dataIndex: 'totalExperience',
    key: 'totalExperience',
  },
  {
    title: 'Application Source',
    dataIndex: 'applicationSource',
    key: 'applicationSource',
  },
]
