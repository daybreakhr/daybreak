import { createContext } from 'react'
import { UserWithClaims } from 'types/user'

const AuthContext = createContext<{
  user: UserWithClaims | null
  signOut: () => void
  signInWithGoogle: () => void
}>({
  user: null,
  signOut: async () => {},
  signInWithGoogle: () => {},
})

export default AuthContext
