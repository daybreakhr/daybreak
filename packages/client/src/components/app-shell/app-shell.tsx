import { Outlet } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import Sidebar from 'components/sidebar'

export default function AppShell() {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <Scrollbars id="application" autoHide className="flex-1 bg-gray-50">
        <Outlet />
      </Scrollbars>
    </div>
  )
}
