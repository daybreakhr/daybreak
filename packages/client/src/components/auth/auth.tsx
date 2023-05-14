import { ReactElement, useEffect, useState } from 'react'
import { message, Spin } from 'antd'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut as logOut,
  User,
} from 'firebase/auth'
import { setUserProperties } from 'firebase/analytics'
import { useQueryClient } from '@tanstack/react-query'
import type { Member } from '@prisma/client'
import { storage } from 'ui-kit'

import { WORKSPACE_ID } from 'utils/constants'
import AuthContext from 'contexts/auth-context'
import { analytics, auth } from 'utils/firebase'
import { fetchMe } from './queries'

type AuthProps = {
  children: ReactElement
}

export default function Auth({ children }: AuthProps) {
  const queryClient = useQueryClient()
  const [authVerified, setAuthVerified] = useState(false)
  const [user, setUser] = useState<User | null>(auth.currentUser)
  const [member, setMember] = useState<Member | null | undefined>()

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const member = await fetchMe()
        if (member) {
          setMember(member)
          storage.set(WORKSPACE_ID, member.workspaceId)
        }

        setUser(authUser)
        setUserProperties(analytics, {
          user: authUser.email,
          WorkspaceID: member?.workspaceId,
        })
      } else {
        setUser(null)
      }
      setAuthVerified(true)
    })
  }, [user])

  async function signInWithGoogle(token: string) {
    try {
      const credential = GoogleAuthProvider.credential(token)
      await signInWithCredential(auth, credential)
      setAuthVerified(false)
    } catch (error: any) {
      message.error(error?.message)
    }
  }

  async function signOut() {
    try {
      await logOut(auth)
      setMember(undefined)
      queryClient.clear() // clear react-query cache
      storage.remove(WORKSPACE_ID)
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
      value={{ user, member, setMember, signOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  )
}
