import { useState } from 'react'
import { FormInstance, Select, Tag } from 'antd'
import { skillList } from '../constants/create-job-values'

type ISelectOption = {
  value: string
  label: string
}

type SkillSelectProps = {
  onChange?: (options: ISelectOption[] | ISelectOption) => void
  form?: FormInstance
}

export default function SkillSelect({ onChange, form }: SkillSelectProps) {
  const [skillsFocused, setSkillsFocused] = useState<boolean>(false)

  return (
    <>
      <Select
        size="large"
        mode="multiple"
        placeholder="Add Skills"
        options={skillList}
        onChange={(value, option) => {
          if (onChange) onChange(option)
        }}
        value={
          form?.getFieldValue('skills') &&
          form
            ?.getFieldValue('skills')
            .map((skill: ISelectOption) => skill.value)
        }
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
      {form?.getFieldValue('skills') &&
        form
          ?.getFieldValue('skills')
          .map((skill: ISelectOption, index: number) => {
            return (
              <Tag
                key={`skill-${index}`}
                closable
                className="px-3 py-1 mt-3 rounded-full"
                onClose={(e) => {
                  e.preventDefault()

                  form.setFieldValue(
                    'skills',
                    form.getFieldValue('skills').filter((sk: ISelectOption) => {
                      return skill.value !== sk.value
                    }),
                  )
                }}
              >
                {skill.label}
              </Tag>
            )
          })}
    </>
  )
}
