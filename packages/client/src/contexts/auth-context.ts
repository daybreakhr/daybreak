import { Member } from '@prisma/client'
import { User } from 'firebase/auth'
import { createContext, Dispatch, SetStateAction } from 'react'

const AuthContext = createContext<{
  user: User | null
  member: Member | null | undefined
  setMember: Dispatch<SetStateAction<Member | null | undefined>>
  signOut: () => Promise<void>
  signInWithGoogle: (token: string) => void
}>({
  user: null,
  member: undefined,
  setMember: () => {},
  signOut: async () => {},
  signInWithGoogle: () => {},
})

export default AuthContext
