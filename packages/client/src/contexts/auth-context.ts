import { Member } from '@prisma/client'
import { createContext, Dispatch, SetStateAction } from 'react'
import { UserWithClaims } from 'types/user'

const AuthContext = createContext<{
  user: UserWithClaims | null
  member: Member | null | undefined
  setMember: Dispatch<SetStateAction<Member | null | undefined>>
  signOut: () => Promise<void>
  signInWithGoogle: () => void
}>({
  user: null,
  member: undefined,
  setMember: () => {},
  signOut: async () => {},
  signInWithGoogle: () => {},
})

export default AuthContext
