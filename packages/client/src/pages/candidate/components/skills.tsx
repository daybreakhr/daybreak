import { range } from 'lodash'
import type { ResumeDataSkillsItem } from '@affinda/affinda'
import { Switch } from 'ui-kit'
import { Tag } from 'antd'

type SkillsProps = {
  skills: ResumeDataSkillsItem[] | undefined
  isLoading: boolean
}

export default function Skills({ skills, isLoading }: SkillsProps) {
  return (
    <div className="flex-1 p-4 text-gray-800 bg-white rounded-md shadow-md">
      <p className="m-4 text-lg font-semibold">Skills</p>

      <div className="p-4 overflow-y-auto max-h-56">
        <ul className="flex flex-wrap">
          <Switch>
            <Switch.Match when={isLoading}>
              {range(2).map((val) => (
                <li key={val}>
                  <div className="flex justify-between space-x-3">
                    <div className="w-20 h-3 space-x-3 bg-gray-100 rounded animate-pulse" />
                    <div className="w-20 h-3 space-x-3 bg-gray-100 rounded animate-pulse" />
                    <div className="w-20 h-3 space-x-3 bg-gray-100 rounded animate-pulse" />
                    <div className="w-20 h-3 space-x-3 bg-gray-100 rounded animate-pulse" />
                    <div className="w-20 h-3 space-x-3 bg-gray-100 rounded animate-pulse" />
                  </div>
                </li>
              ))}
            </Switch.Match>

            <Switch.Match when={skills}>
              {(data) =>
                data.map(({ id, name }) => (
                  <div key={id} className="pb-2">
                    <li key={id}>
                      <Tag>{name}</Tag>
                    </li>
                  </div>
                ))
              }
            </Switch.Match>
          </Switch>
        </ul>
      </div>
    </div>
  )
}
