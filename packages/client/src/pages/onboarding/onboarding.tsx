import { Navigate } from 'react-router-dom'
import Header from 'components/header'
import useAuth from 'hooks/use-auth'

export default function Onboarding() {
  const { member } = useAuth()

  if (member) {
    return <Navigate to="/home" />
  }

  return <Header />
}
