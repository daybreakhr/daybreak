import { Avatar, Empty } from 'antd'
import { range } from 'lodash'
import { Switch } from 'ui-kit'

type CertificationProps = {
  certifications: string[] | undefined
  isLoading: boolean
}

export default function Education({
  certifications,
  isLoading,
}: CertificationProps) {
  return (
    <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="mb-4 text-lg font-semibold">Certifications</p>
      <div className="p-4 overflow-y-auto max-h-64">
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
            <Switch.Match when={certifications?.length === 0}>
              <Empty
                description={
                  <div>
                    <p>Unable to parse certifications from resume</p>
                    <p>View Resume for more details</p>
                  </div>
                }
              />
            </Switch.Match>
            <Switch.Match when={certifications}>
              {(data) =>
                data.map((certification) => (
                  <li key={certification}>
                    <div className="flex items-start space-x-3">
                      <Avatar>{certification[0]}</Avatar>
                      <div>
                        <p className="font-medium">{certification}</p>
                      </div>
                    </div>
                  </li>
                ))
              }
            </Switch.Match>
          </Switch>
        </ul>
      </div>
    </div>
  )
}
