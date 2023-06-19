import { AiOutlineLogout } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import useAuth from 'hooks/use-auth'

export default function Header() {
  const navigate = useNavigate()
  const { signOut, user } = useAuth()

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: 'Logout',
      icon: <AiOutlineLogout />,
      onClick: () => signOut().then(() => navigate('/')),
    },
  ]

  return (
    <header className="flex items-center px-5 py-2 space-x-4 border-b">
      <Link to="/dashboard">
        <img
          src="/assets/logo_large.svg"
          className="flex items-center object-center w-40 h-8"
        />
      </Link>

      <div className="flex-1" />

      <Button
        href="https://drive.google.com/file/d/1y-d55JVfa1Qi5-D0s3L8iJFrZgOcJ7Jw/view?usp=sharing"
        type="link"
        target="_blank"
        className="text-gray-500"
        icon={<QuestionCircleOutlined />}
      >
        Help
      </Button>

      <Dropdown menu={{ items }}>
        <div className="flex items-center px-3 py-1 space-x-2 rounded-md cursor-pointer hover:bg-gray-100">
          <Avatar src={user?.photoURL}>{user?.displayName?.charAt(0)}</Avatar>
          <div>
            <p className="text-sm">{user?.displayName}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </Dropdown>
    </header>
  )
}
