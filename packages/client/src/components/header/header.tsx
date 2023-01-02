import { useNavigate } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { Avatar, Dropdown, MenuProps } from 'antd'
import useAuth from 'hooks/use-auth'

export default function Header() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <div className="border-b">
          <p className="mb-0 text-xs text-gray-700">Signed-in as</p>
          <p className="mb-0">{user?.displayName}</p>
        </div>
      ),
    },
    {
      key: 2,
      label: 'Logout',
      icon: <AiOutlineLogout />,
      onClick: () => signOut().then(() => navigate('/')),
    },
  ]

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <img
        src="/assets/logo_large.svg"
        className="flex items-center object-center w-40 h-8"
      />

      <Dropdown menu={{ items }}>
        <Avatar src={user?.photoURL}>{user?.displayName?.charAt(0)}</Avatar>
      </Dropdown>
    </header>
  )
}
