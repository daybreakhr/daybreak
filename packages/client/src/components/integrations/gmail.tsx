import { Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { useGoogleLogin } from '@react-oauth/google'

import useAuth from 'hooks/use-auth'
import { fetchGoogleTokens, updateAppStatus } from './queries'

const { title, imgSrc, description } = {
  title: 'Gmail',
  imgSrc:
    'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
  description:
    'Engage with candidates via email and create automated email workflows',
}

export default function Gmail() {
  const { member, setMember } = useAuth()

  const { mutate, isLoading } = useMutation(updateAppStatus, {
    onSuccess: (member) => setMember(member),
  })

  const googleLogin = useGoogleLogin({
    // Get authorisation token for sending emails via gmail
    scope: 'https://www.googleapis.com/auth/gmail.send',
    onSuccess: async ({ code }) => {
      await fetchGoogleTokens({ code })
      mutate({
        appName: 'gmail',
        isInstalled: true,
        memberId: member?.id ?? '',
      })
    },
    flow: 'auth-code',
  })

  return (
    <div className="mb-4">
      <img src={imgSrc} alt={title} className="w-8 h-8 mb-4" />
      <div className="mb-2">
        <p className="mb-1 text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <Button block loading={isLoading} onClick={() => googleLogin()}>
        Connect <RightOutlined />
      </Button>
    </div>
  )
}
