import { ComponentType } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import useAuthContext from 'hooks/use-auth'

type AuthLayoutProps = {
  component: ComponentType<any>
}

export default function AuthLayout({ component: Component }: AuthLayoutProps) {
  const { user } = useAuthContext()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return <Component />
}
