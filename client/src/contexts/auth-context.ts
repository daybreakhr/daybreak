import { createContext } from 'react'
import { User } from 'firebase/auth'

const AuthContext = createContext<{
  user: User | null
  signOut: () => void
  signInWithGoogle: () => void
}>({
  user: null,
  signOut: async () => {},
  signInWithGoogle: () => {},
})

export default AuthContext
