import useAuth from 'hooks/use-auth'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p>Welcome {user?.displayName}!!!</p>
      <p>You are now authenticated with your gmail</p>
    </div>
  )
}
