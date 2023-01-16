import { useEffect } from 'react'
import LogRocket from 'logrocket'
import useAuth from 'hooks/use-auth'

export default function Logrocket() {
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      LogRocket.init(import.meta.env.VITE_LOGROCKET_KEY)
      LogRocket.identify(user.uid, {
        name: user.displayName ?? 'Unknown',
        email: user.email ?? 'Unknown',
      })
    }
  }, [user])

  return null
}
