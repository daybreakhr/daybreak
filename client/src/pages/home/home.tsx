import useAuth from 'hooks/use-auth'

export default function Home() {
  const { user } = useAuth()

  return `Welcome ${user?.displayName ?? user?.email}!!! 
  You are now authenticated with your gmail`
}
