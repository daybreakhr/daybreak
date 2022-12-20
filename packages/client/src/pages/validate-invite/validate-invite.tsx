import { useMutation } from '@tanstack/react-query'
import { Spin } from 'antd'
import useAuth from 'hooks/use-auth'

import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { verifyMember } from './queries'

export default function Invite() {
  const { inviteId = '' } = useParams()
  const { user, member } = useAuth()
  const navigate = useNavigate()

  const { mutate: validateMember } = useMutation(verifyMember, {
    onError: () => {
      navigate('/onboarding')
    },
  })

  useEffect(() => {
    !member && user && validateMember({ inviteId })
  }, [inviteId, user, member, validateMember])

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
