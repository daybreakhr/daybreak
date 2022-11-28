import { AiOutlineGoogle } from 'react-icons/ai'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from 'hooks/use-auth'

export default function Login() {
  const { signInWithGoogle, user, member } = useAuth()
  const { state }: any = useLocation()
  const from = state?.from?.pathname ?? '/home'

  if (user && !member) {
    return <Navigate to="/onboarding" />
  }

  if (user && member) {
    return <Navigate to={from} replace />
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen text-xl">
      <button
        className="flex items-center justify-center w-64 px-4 py-2 mb-4 space-x-4 text-base text-white bg-red-500 rounded focus:outline-none"
        onClick={signInWithGoogle}
      >
        <AiOutlineGoogle className="text-xl" />
        <span className="font-semibold">Continue with Google</span>
      </button>
    </div>
  )
}
