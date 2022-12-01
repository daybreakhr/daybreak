import { Member } from '@prisma/client'
import { createContext } from 'react'
import { UserWithClaims } from 'types/user'

const AuthContext = createContext<{
  user: UserWithClaims | null
  member: Member | null | undefined
  signOut: () => Promise<void>
  signInWithGoogle: () => void
}>({
  user: null,
  member: undefined,
  signOut: async () => {},
  signInWithGoogle: () => {},
})

export default AuthContext
