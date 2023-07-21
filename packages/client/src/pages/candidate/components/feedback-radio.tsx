import { ChangeEvent } from 'react'
import clsx from 'clsx'

const options = [
  { label: '🚫 Strong No', value: 'STRONG_NO' },
  { label: '👎 No', value: 'NO' },
  { label: '👍 Yes', value: 'YES' },
  { label: '🏆 Strong Yes', value: 'STRONG_YES' },
]

type FeedbackRadioProps = {
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function FeedbackRadio({ value, onChange }: FeedbackRadioProps) {
  function onRadioChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value as any)
  }
  return (
    <div className="flex items-center space-x-3">
      {options.map((option) => (
        <label key={option.value} className="cursor-pointer">
          <input
            type="radio"
            className="sr-only"
            value={option.value}
            onChange={onRadioChange}
            checked={value === option.value}
          />
          <span
            className={clsx('px-3 py-1.5 border rounded-full font-medium', {
              'bg-gray-100': option.value === value,
            })}
          >
            {option.label}
          </span>
        </label>
      ))}
    </div>
  )
}
