import useAuth from 'hooks/use-auth'

export default function OnboardingHeader() {
  const { user } = useAuth()

  return (
    <div className="text-base text-center text-gray-500 py-9">
      {user?.email}
    </div>
  )
}
