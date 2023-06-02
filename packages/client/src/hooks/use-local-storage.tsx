import { useCallback, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { storage } from 'ui-kit'

export type SetValue<T> = Dispatch<SetStateAction<T>>

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): readonly [T, SetValue<T>] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = storage.get(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key])

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== 'undefined') {
        storage.set(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}
