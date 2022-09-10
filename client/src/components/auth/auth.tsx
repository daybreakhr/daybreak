import { ReactElement, useEffect, useState } from 'react'
import { message, Spin } from 'antd'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as logOut,
} from 'firebase/auth'

import { Role } from 'types/member'
import { UserWithClaims } from 'types/user'
import AuthContext from 'contexts/auth-context'
import { auth, googleAuthProvider } from 'utils/firebase'

type AuthProps = {
  children: ReactElement
}

export default function Auth({ children }: AuthProps) {
  const [authVerified, setAuthVerified] = useState(false)
  const [user, setUser] = useState<UserWithClaims | null>(auth.currentUser)

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const idTokenResult = await authUser.getIdTokenResult()
        const role = idTokenResult.claims?.role as Role
        setUser({ ...authUser, role })
      } else {
        setUser(null)
      }
      setAuthVerified(true)
    })
  }, [])

  async function signInWithGoogle() {
    try {
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

  if (!authVerified) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spin tip="Verifying User..." />
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
