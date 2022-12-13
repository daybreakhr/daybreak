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
    <div className="flex w-screen h-screen text-xl">
      <div className="flex flex-col items-center justify-center flex-1 px-8 py-12 space-y-8 bg-white">
        <div>
          <img
            src="/assets/logo_large.svg"
            className="object-cover object-center h-16 -translate-x-2 translate-y-2 w-60"
          />
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="pb-4 text-3xl font-medium text-gray-800">Sign in</h1>
          <button
            className="flex items-center justify-center w-64 px-4 py-2 mb-4 space-x-4 text-base text-white bg-purple-600 rounded focus:outline-none hover:bg-purple-500"
            onClick={signInWithGoogle}
          >
            <AiOutlineGoogle className="text-xl" />
            <span className="font-semibold">Continue with Google</span>
          </button>
        </div>
      </div>
      <div className="w-3/4 h-screen bg-cover bg-cover-image" />
    </div>
  )
}
