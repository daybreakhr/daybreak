import { useEffect, useRef } from 'react'
import { Spin } from 'antd'
import { useMutation } from '@tanstack/react-query'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { storage } from 'ui-kit'
import useAuth from 'hooks/use-auth'
import { fetchMe } from 'components/auth/queries'
import { WORKSPACE_ID } from 'utils/constants'
import { verifyInvitee } from './queries'

export default function Invite() {
  const navigate = useNavigate()
  const dataFetchedRef = useRef(false)
  const { inviteId = '' } = useParams()
  const { user, member, setMember } = useAuth()

  const { mutate: validateInvitee } = useMutation(verifyInvitee, {
    onSuccess: async () => {
      const me = await fetchMe()
      if (me) {
        setMember(me)
        storage.set(WORKSPACE_ID, me.workspaceId)
      }
    },
    onError: () => {
      navigate('/onboarding')
    },
  })

  useEffect(() => {
    if (!member && user && !dataFetchedRef.current) {
      dataFetchedRef.current = true
      validateInvitee({ inviteId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) {
    return <Navigate to="/" state={{ inviteId }} />
  }

  if (user && member) {
    return <Navigate to="/home" />
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Spin tip="Preparing your workspace for you..." />
    </div>
  )
}
