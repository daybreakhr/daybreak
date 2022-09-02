import { ReactElement, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as logOut,
  User,
} from 'firebase/auth'
import { auth, googleAuthProvider } from 'utils/firebase'
import AuthContext from 'contexts/auth-context'
import { message, Spin } from 'antd'

type AuthProps = {
  children: ReactElement
}

export default function Auth({ children }: AuthProps) {
  const [authVerified, setAuthVerified] = useState(false)
  const [user, setUser] = useState<User | null>(auth.currentUser)

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
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
