import dayjs from 'dayjs'
import { Avatar } from 'antd'
import { range } from 'lodash'
import type { ResumeDataWorkExperienceItem } from '@affinda/affinda'
import { Show, Switch } from 'ui-kit'
import { Scrollbars } from 'react-custom-scrollbars'

type ExperiencesProps = {
  experiences: ResumeDataWorkExperienceItem[]
  isLoading: boolean
}

export default function Experiences({
  experiences,
  isLoading,
}: ExperiencesProps) {
  return (
    <div className="text-gray-800 bg-white rounded-md shadow-md">
      <p className="m-4 text-lg font-semibold">Experiences</p>
      <Scrollbars autoHeight autoHeightMax={240}>
       <div className="p-4 overflow-y-auto">
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

            <Switch.Match when={experiences}>
              {(data) =>
                data.map(({ jobTitle, organization, id, dates }) => (
                  <li key={id}>
                    <div className="flex items-start space-x-3">
                      <Avatar>{organization?.[0]}</Avatar>
                      <div>
                        <p className="font-medium">{organization}</p>
                        <p className="text-sm text-gray-800">{jobTitle}</p>
                      </div>
                      <div className="flex-1" />

                      <p className="text-gray-500">
                        <Show when={dates?.startDate}>
                          {(date) => (
                            <span>{dayjs(date).format('MMM YY')} - </span>
                          )}
                        </Show>

                        <Show when={dates?.endDate}>
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
                ))
              }
            </Switch.Match>
          </Switch>
        </ul>
      </div>
      </Scrollbars>
    </div>
  )
}
