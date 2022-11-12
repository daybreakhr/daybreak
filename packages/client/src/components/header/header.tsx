import { Avatar, Dropdown, MenuProps } from 'antd'
import { AiOutlineLogout } from 'react-icons/ai'
import useAuth from 'hooks/use-auth'

export default function Header() {
  const { signOut, user } = useAuth()

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div className="p-2 border-b">
          <p className="mb-0 text-xs text-gray-700">Signed-in as</p>
          <p className="mb-0">{user?.displayName}</p>
        </div>
      ),
    },
    { key: 2, label: 'Logout', icon: <AiOutlineLogout />, onClick: signOut },
  ]

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-white bg-gray-600 rounded-lg">
          <span>D</span>
        </div>

        <span className="mb-0 font-sans font-medium text-gray-700">
          Daybreak
        </span>
      </div>

      <Dropdown menu={{ items }}>
        <Avatar src={user?.photoURL}>{user?.displayName?.charAt(0)}</Avatar>
      </Dropdown>
    </header>
  )
}
