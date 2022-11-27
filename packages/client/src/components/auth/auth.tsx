import { ReactElement, useEffect, useState } from 'react'
import { message, Spin } from 'antd'
import { useQuery } from '@tanstack/react-query'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as logOut,
} from 'firebase/auth'
import { Role } from 'types/member'
import { UserWithClaims } from 'types/user'
import AuthContext from 'contexts/auth-context'
import { auth, googleAuthProvider } from 'utils/firebase'
import { fetchMe } from './queries'
import { storage } from 'ui-kit'

type AuthProps = {
  children: ReactElement
}

export default function Auth({ children }: AuthProps) {
  const [authVerified, setAuthVerified] = useState(false)
  const [user, setUser] = useState<UserWithClaims | null>(auth.currentUser)

  const { data: member, isLoading } = useQuery(['me'], fetchMe, {
    onSuccess: (data) => {
      if (data) {
        storage.set('workspaceId', data.workspaceId)
      }
      setAuthVerified(true)
    },
    onSettled: () => {
      setAuthVerified(true)
    },
    enabled: !!user,
  })

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const idTokenResult = await authUser.getIdTokenResult()
        const role = idTokenResult.claims?.role as Role
        setUser(authUser)
        setUser((prev) => {
          if (prev) {
            prev.role = role
          }
          return prev
        })
      } else {
        setUser(null)
        setAuthVerified(true)
      }
    })
  }, [])

  async function signInWithGoogle() {
    try {
      setAuthVerified(false)
      await signInWithPopup(auth, googleAuthProvider)
    } catch (error: any) {
      message.error(error?.message)
    }
  }

  async function signOut() {
    try {
      await logOut(auth)
    } catch (error: any) {
      message.error(error?.message)
    }
  }

  if (!authVerified || isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spin tip="Verifying User..." />
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, member, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
