import { useState } from 'react'
import { Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { useGoogleLogin } from '@react-oauth/google'
import { storage } from 'ui-kit'

export default function Calendar() {
  const [isConnected, setIsConnected] = useState(
    () => !!storage.get('accessToken'),
  )

  const googleLogin = useGoogleLogin({
    // Get authorisation token for reading and editing events in google calendar
    scope: 'https://www.googleapis.com/auth/calendar.events',
    onSuccess: ({ access_token }) => {
      storage.set('accessToken', access_token)
      setIsConnected(true)
    },
  })

  return (
    <div className="p-4 border rounded-md shadow w-96">
      <div className="flex mb-2 space-x-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
          className="w-16 h-16"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-0.5">
            Google Calendar
          </h3>

          <p className="mb-2 text-sm text-gray-500">
            Schedule and manage interviews directly within Daybreak Hire
          </p>

          <Button
            disabled={isConnected}
            onClick={() => googleLogin()}
            type={isConnected ? 'default' : 'primary'}
            icon={isConnected ? <CheckOutlined /> : null}
          >
            {isConnected ? 'Connected' : 'Connect'}
          </Button>
        </div>
      </div>
    </div>
  )
}
