import dayjs from 'dayjs'
import { range } from 'lodash'
import { Avatar, Empty } from 'antd'
import type { Experience } from '@prisma/client'
import { Scrollbars } from 'react-custom-scrollbars'
// import type { ResumeDataWorkExperienceItem } from '@affinda/affinda'
import { Show, Switch } from 'ui-kit'

type ExperiencesProps = {
  experiences: Experience[] | undefined
  isLoading: boolean
}

export default function Experiences({
  experiences,
  isLoading,
}: ExperiencesProps) {
  return (
    <div className="text-gray-800 bg-white rounded-md shadow-md">
      <p className="m-4 text-lg font-semibold">Experiences</p>
      <Scrollbars autoHeight autoHide autoHeightMax={240}>
        <ul className="p-4 space-y-4">
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

            <Switch.Match when={experiences?.length === 0}>
              <Empty
                description={
                  <div>
                    <p>Unable to parse experiences from resume</p>
                    <p>View Resume for more details</p>
                  </div>
                }
              />
            </Switch.Match>

            <Switch.Match when={experiences}>
              {(data) =>
                data.map(
                  (
                    { company, designation, startDate, endDate, isCurrent },
                    idx,
                  ) => (
                    <li key={idx}>
                      <div className="flex items-start space-x-3">
                        <Avatar>{company?.[0]}</Avatar>
                        <div>
                          <p className="font-medium">{company}</p>
                          <p className="text-gray-800">{designation}</p>
                        </div>
                        <div className="flex-1" />

                        <p className="text-gray-500">
                          <Show when={startDate}>
                            {(date) => (
                              <span>{dayjs(date).format('MMM YY')} - </span>
                            )}
                          </Show>

                          <Show when={endDate}>
                            {(date) => (
                              <span>
                                {isCurrent
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
      </Scrollbars>
    </div>
  )
}
