import { ReactNode } from 'react'

type MatchProps<T> = {
  when: T | undefined | null | false
  children: ReactNode | ((item: T) => ReactNode)
}

const Match = <T extends unknown>({ when, children }: MatchProps<T>) => {
  if (when || when === 0) {
    if (typeof children === 'function') {
      return <>{children(when)}</>
    } else {
      return <>{children}</>
    }
  }

  return null
}

Match.displayName = 'Match'

export default Match
