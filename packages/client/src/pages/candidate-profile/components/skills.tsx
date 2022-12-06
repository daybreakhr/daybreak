import { range } from 'lodash'
import type { ResumeDataSkillsItem } from '@affinda/affinda'
import { Switch } from 'ui-kit'
import { Tag } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'

type SkillsProps = {
  skills: ResumeDataSkillsItem[] | undefined
  isLoading: boolean
}

export default function Skills({ skills, isLoading }: SkillsProps) {
  return (
    <div className="flex-1 text-gray-800 bg-white rounded-md shadow-md 2xl:col-span-2">
      <p className="m-4 text-lg font-semibold">Skills</p>
      <Scrollbars autoHeight autoHide autoHeightMax={224}>
        <ul className="flex flex-wrap p-4">
          <Switch>
            <Switch.Match when={isLoading}>
              <li className="flex justify-between mb-2 space-x-3">
                {range(12).map((val) => (
                  <div
                    key={val}
                    className="w-20 h-6 space-x-3 bg-gray-100 rounded animate-pulse"
                  />
                ))}
              </li>
            </Switch.Match>

            <Switch.Match when={skills}>
              {(data) =>
                data.map(({ id, name }) => (
                  <li key={id} className="pb-2">
                    <Tag>{name}</Tag>
                  </li>
                ))
              }
            </Switch.Match>
          </Switch>
        </ul>
      </Scrollbars>
    </div>
  )
}
