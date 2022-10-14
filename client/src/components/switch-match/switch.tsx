import { Children, ReactNode } from 'react'
import Match from './match'

type SwitchProps = {
  fallback?: ReactNode
  children: ReactNode
}

const Switch = ({ fallback = null, children }: SwitchProps) => {
  const arrayChildren = Children.toArray(children)

  const truthyChild = Children.map(arrayChildren, (child) => {
    // @ts-expect-error
    if (child.type.displayName !== 'Match') {
      // eslint-disable-next-line no-console
      console.warn(
        // @ts-expect-error
        `Switch component accepts only Match as it's direct descendant. Replace usage of "${child.type}" with Match`,
      )
    }

    if (
      // @ts-expect-error
      child.type.displayName === 'Match' &&
      // @ts-expect-error
      (child.props.when || child.props.when === 0)
    ) {
      return <>{child}</>
    }
    return null
  }).filter((child) => child !== null)

  return truthyChild[0] ?? <>{fallback}</>
}

Switch.displayName = 'Switch'

export default Object.assign(Switch, { Match })
