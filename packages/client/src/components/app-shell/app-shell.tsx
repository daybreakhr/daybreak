import { Outlet } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import Sidebar from 'components/sidebar'
import Header from 'components/header'

export default function AppShell() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Scrollbars autoHide className="flex flex-col flex-1 bg-gray-100">
          <Outlet />
        </Scrollbars>
      </div>
    </div>
  )
}
