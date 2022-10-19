import { Outlet } from 'react-router-dom'
import Sidebar from 'components/sidebar'
import Header from 'components/header'

export default function AppShell() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />

      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
