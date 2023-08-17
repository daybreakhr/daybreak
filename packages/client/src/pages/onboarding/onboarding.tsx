import { Navigate, Outlet } from 'react-router-dom'
import useAuth from 'hooks/use-auth'

// import Header from './header'

export default function Onboarding() {
  const { member } = useAuth()

  if (member) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="flex flex-col">
      {/* TODO: Replace with onboarding header */}
      {/* <Header /> */}

      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  )
}
