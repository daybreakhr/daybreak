import type { ColumnsType } from 'antd/es/table'

type Candidate = {
  id: string
  firstName: string
  middleName: string | null
  lastName: string
  email: string
  phone: string
  location: string
  resume: string | null
  linkedInUrl: string
  createdAt: Date
  jobId: string
  workspaceId: string
}

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
