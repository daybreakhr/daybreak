import { GoogleLogin } from '@react-oauth/google'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from 'hooks/use-auth'

export default function Login() {
  const { signInWithGoogle, user, member } = useAuth()
  const { state }: any = useLocation()
  const from = state?.from?.pathname ?? '/dashboard'
  const inviteId = state?.inviteId

  if (user && !member && inviteId) {
    return <Navigate to={`/invite/${inviteId}`} state={{ inviteId }} />
  }

  if (user && !member && !inviteId) {
    return <Navigate to="/onboarding" />
  }

  if (user && member) {
    return <Navigate to={from} replace />
  }

  return (
    <div className="flex w-screen h-screen text-xl">
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-12 space-y-8 bg-white">
        <div>
          <img
            src="/assets/logo_large.svg"
            className="object-center h-16 w-60"
          />
        </div>
        <div className="flex flex-col justify-center h-full">
          <GoogleLogin
            onSuccess={({ credential }) => {
              if (credential) {
                signInWithGoogle(credential)
              }
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-16 space-y-1 text-sm text-gray-500">
          <p className="text-center">
            © Copyright {new Date().getFullYear()} Daybreak Technologies Private
            Limited. All rights reserved.
          </p>
          <a
            href="/privacy-policy"
            className="text-primary-500 hover:underline"
            target="_blank"
          >
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="w-3/4 h-screen bg-cover bg-cover-image" />
    </div>
  )
}
