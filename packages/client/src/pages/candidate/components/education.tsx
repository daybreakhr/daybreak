import dayjs from 'dayjs'
import { range } from 'lodash'
import { Avatar, Empty } from 'antd'
import type { ResumeDataEducationItem } from '@affinda/affinda'
import { Show, Switch } from 'ui-kit'

type EducationProps = {
  educations: ResumeDataEducationItem[] | undefined
  isLoading: boolean
}

export default function Education({ educations, isLoading }: EducationProps) {
  return (
    <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="mb-4 text-lg font-semibold">Educations</p>
      <div className="p-4 overflow-y-auto max-h-56">
        <ul className="space-y-4">
          <Switch>
            <Switch.Match when={isLoading}>
              {range(2).map((val) => (
                <li key={val}>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse" />

                    <div className="space-y-2">
                      <div className="w-20 h-6 bg-gray-100 rounded animate-pulse" />
                      <div className="w-48 h-6 bg-gray-100 rounded animate-pulse" />
                    </div>

                    <div className="flex-1" />

                    <div className="w-24 h-6 bg-gray-100 rounded animate-pulse" />
                  </div>
                </li>
              ))}
            </Switch.Match>

            <Switch.Match when={educations?.length === 0}>
              <Empty
                description={
                  <div>
                    <p>Unable to parse education from resume</p>
                    <p>View Resume for more details</p>
                  </div>
                }
              />
            </Switch.Match>

            <Switch.Match when={educations}>
              {(data) =>
                data.map(
                  ({ accreditation, organization, id, dates, grade }) => (
                    <li key={id}>
                      <div className="flex items-start space-x-3">
                        <Avatar>{organization?.[0]}</Avatar>
                        <div>
                          <p className="font-medium">{organization}</p>
                          <p className="text-gray-500">
                            {accreditation?.education}, {grade?.raw}
                          </p>
                        </div>
                        <div className="flex-1" />

                        <p className="flex-none text-gray-500">
                          <Show when={dates?.startDate}>
                            {(date) => (
                              <span>{dayjs(date).format('MMM YY')} - </span>
                            )}
                          </Show>

                          <Show when={dates?.completionDate}>
                            {(date) => (
                              <span>
                                {dates?.isCurrent
                                  ? 'Present'
                                  : dayjs(date).format('MMM YY')}
                              </span>
                            )}
                          </Show>
                        </p>
                      </div>
                    </li>
                  ),
                )
              }
            </Switch.Match>
          </Switch>
        </ul>
      </div>
    </div>
  )
}
