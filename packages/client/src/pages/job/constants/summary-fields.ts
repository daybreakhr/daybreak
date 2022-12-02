import { Location } from '@prisma/client'
import dayjs from 'dayjs'
import { capitalize, words } from 'lodash'
import { Job } from 'types/job'

export const fields = (data: Job | undefined) => [
  {
    id: 'createdAt',
    title: 'Job Creation Date',
    value: (value: Date) => dayjs(value).format('MMM DD, YYYY'),
  },
  {
    id: 'jobType',
    title: 'Job Type',
    value: (value: string) => words(value).map(capitalize).join(' '),
  },
  {
    id: 'experience',
    title: 'Experience',
    value: (value: string) => value,
  },
  {
    id: 'Location',
    title: 'Location',
    value: (value: Location) => value.name,
  },
  {
    id: 'minSalary',
    title: 'Salary Range',
    value: () =>
      `${data?.currency?.toUpperCase()} ${data?.minSalary} - ${
        data?.maxSalary
      }`,
  },
  {
    id: 'updatedAt',
    title: 'Last Updated At',
    value: (value: Date) => dayjs(value).format('MMM DD, YYYY'),
  },
]
