import dayjs from 'dayjs'
import { range } from 'lodash'
import { Skeleton } from 'antd'
import { FaGraduationCap } from 'react-icons/fa'

import { Switch } from 'ui-kit'
import { Candidate } from 'types/candidate'
import { ReactComponent as BuildingColumnsIcon } from 'assets/icons/building-columns.svg'

type ProfileProps = {
  isLoading: boolean
  candidate: Candidate | undefined
}

export default function Profile({ candidate, isLoading }: ProfileProps) {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <p className="text-base font-semibold">Experience</p>
      <p className="text-gray-500">{candidate?.totalYearsOfExperience} years</p>

      <div className="grid grid-cols-1 gap-5 mt-4 mb-6">
        <Switch>
          <Switch.Match when={isLoading}>
            {range(3).map((index) => (
              <Skeleton
                active
                key={index}
                paragraph={{ rows: 0 }}
                avatar={{ shape: 'square', className: 'rounded-md' }}
              />
            ))}
          </Switch.Match>

          <Switch.Match when={candidate?.experience}>
            {(experience) =>
              experience.map((experience, index) => {
                const { isCurrent, company, designation, startDate, endDate } =
                  experience

                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-2 text-gray-500 bg-gray-100 rounded-md">
                      <BuildingColumnsIcon />
                    </div>

                    <div>
                      <p className="font-medium">
                        {company ?? 'N/A'}{' '}
                        {isCurrent ? '(current company)' : null}
                      </p>
                      <p className="text-xs">{designation}</p>
                    </div>

                    <div className="flex-1" />

                    <p className="text-xs text-gray-500">
                      {dayjs(startDate).format('MMM YYYY')} -{' '}
                      {isCurrent
                        ? 'Present'
                        : dayjs(endDate).format('MMM YYYY')}
                    </p>
                  </div>
                )
              })
            }
          </Switch.Match>
        </Switch>
      </div>

      <p className="text-base font-semibold">Skills</p>
      <div className="flex flex-wrap gap-2 my-4">
        <Switch>
          <Switch.Match when={isLoading}>
            {range(20).map((index) => (
              <div
                key={index}
                className="w-20 h-6 bg-gray-100 rounded-md animate-pulse"
              />
            ))}
          </Switch.Match>

          <Switch.Match when={candidate?.skills}>
            {(skills) =>
              skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-2 text-xs text-gray-700 bg-gray-100 rounded-md"
                >
                  {skill}
                </div>
              ))
            }
          </Switch.Match>
        </Switch>
      </div>

      <p className="text-base font-semibold">Education</p>
      <div className="grid grid-cols-1 gap-5 mt-4 mb-6">
        <Switch>
          <Switch.Match when={isLoading}>
            {range(3).map((index) => (
              <Skeleton
                active
                key={index}
                paragraph={{ rows: 0 }}
                avatar={{ shape: 'square', className: 'rounded-md' }}
              />
            ))}
          </Switch.Match>

          <Switch.Match when={candidate?.education}>
            {(education) =>
              education.map((education, index) => {
                const { institute, course, startDate, endDate } = education

                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-2 text-base text-gray-500 bg-gray-100 rounded-md">
                      <FaGraduationCap />
                    </div>

                    <div>
                      <p className="font-medium">{institute ?? 'N/A'}</p>
                      <p className="text-xs">{course}</p>
                    </div>

                    <div className="flex-1" />

                    <p className="text-xs text-gray-500">
                      {dayjs(startDate).format('MMM YYYY')} -{' '}
                      {dayjs(endDate).format('MMM YYYY')}
                    </p>
                  </div>
                )
              })
            }
          </Switch.Match>
        </Switch>
      </div>
    </div>
  )
}
