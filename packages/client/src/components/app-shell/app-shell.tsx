import { Outlet } from 'react-router-dom'
import Sidebar from 'components/sidebar'
import Header from 'components/header'
import { Scrollbars } from 'react-custom-scrollbars'

export default function AppShell() {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Scrollbars autoHide>
          <div className="flex flex-col flex-1 bg-gray-100">
            <Outlet />
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}
