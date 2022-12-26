import { Location } from '@prisma/client'
import { Avatar } from 'antd'
import dayjs from 'dayjs'
import { capitalize, words } from 'lodash'
import { Job } from 'types/job'
import { Member } from 'types/member'

export const fields = (
  data: Job | undefined,
  members: Member[] | undefined,
) => [
  {
    id: 'createdAt',
    title: 'Job Creation Date',
    value: (value: Date) => dayjs(value).format('MMM DD, YYYY'),
  },
  {
    id: 'hiringManager',
    title: 'Hiring Manager',
    value: (value: string) => {
      const hiringManager = members?.find(({ uid }) => uid === value)
      if (hiringManager) {
        const { photoURL, displayName } = hiringManager
        return (
          <div className="flex items-center space-x-2">
            <Avatar src={photoURL} size="small" className="flex-none">
              {displayName?.charAt(0)}
            </Avatar>
            <p className="truncate" title={displayName ?? ''}>
              {displayName}
            </p>
          </div>
        )
      } else {
        return null
      }
    },
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
