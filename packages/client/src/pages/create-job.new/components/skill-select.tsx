import { useState } from 'react'
import { Form, Select, Tag } from 'antd'
import { skillList } from '../constants/create-job-values'

type ISelectOption = {
  value: string
  label: string
}

type ISelectOptionsArray = Array<ISelectOption> | []

type SkillSelectProps = { onChange?: Function }

export default function SkillSelect({ onChange }: SkillSelectProps) {
  const [skills, setSkills] = useState<ISelectOptionsArray>([])
  const [skillsFocused, setSkillsFocused] = useState<boolean>(false)
  return (
    <Form.Item>
      <Select
        size="large"
        mode="multiple"
        placeholder="Add Skills"
        options={skillList}
        onChange={(_, option) => {
          if (option instanceof Array) {
            setSkills(option)
          }
          if (onChange) {
            onChange(option)
          }
        }}
        value={skills.map((skill: ISelectOption) => {
          return skill.value
        })}
        tagRender={(props) => {
          return (
            <>
              {skillsFocused ? (
                <Tag
                  onMouseDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                  }}
                  closable={props?.closable}
                  onClose={props?.onClose}
                  style={{ marginRight: 3 }}
                >
                  {props?.label}
                </Tag>
              ) : (
                <></>
              )}
            </>
          )
        }}
        onFocus={() => setSkillsFocused(true)}
        onBlur={() => setSkillsFocused(false)}
      />
      {skills.map((skill: ISelectOption, index: number) => {
        return (
          <Tag
            key={`skill-${index}`}
            closable
            className="px-3 py-1 mt-3 rounded-full"
            onClose={(e) => {
              e.preventDefault()
              setSkills(
                skills.filter((sk: ISelectOption) => {
                  return skill.label !== sk.label
                }),
              )
            }}
          >
            {skill.label}
          </Tag>
        )
      })}
    </Form.Item>
  )
}
