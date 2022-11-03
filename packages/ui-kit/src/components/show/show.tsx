import * as React from 'react'

type ShowProps<T> = {
  /** Logical variable based on which either children or fallback will be rendered */
  when: T | undefined | null | false
  /** Children to be rendered when the **when** is truthy */
  children: React.ReactNode | ((item: T) => React.ReactNode)
  /** Fallback to be rendered when the **when** is falsy */
  fallback?: React.ReactNode
}

/**
 * Show component is used to conditional render part of the view: it renders
 * **children** when the **when** is truthy, and **fallback** otherwise.
 * It is similar to the ternary operator (`when ? children : fallback`), but
 * is ideal for templating JSX.
 * @param props.when Can be a boolean value or any other state which can reused as an argument for the functional children
 * @param props.children A JSX.Element or a function which will be called with the **when** value as argument to return JSX.Element
 * @param props.fallback A JSX.Element to be rendered when the **when** is falsy
 * @returns
 */
export default function Show<T>({ when, children, fallback }: ShowProps<T>) {
  if (when || typeof when === 'number') {
    if (children instanceof Function) {
      return <>{children(when)}</>
    }
    return <>{children}</>
  }

  return <>{fallback ?? null}</>
}
