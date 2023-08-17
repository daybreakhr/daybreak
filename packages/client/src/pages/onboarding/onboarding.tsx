import { Navigate, Outlet } from 'react-router-dom'
// import Header from 'components/header'
import useAuth from 'hooks/use-auth'

export default function Onboarding() {
  const { member } = useAuth()

  if (member) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* TODO: Replace with onboarding header */}
      {/* <Header /> */}

      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  )
}
