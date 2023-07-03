import { useEffect, useState } from 'react'
import { message } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { storage } from 'ui-kit'
import { fetchSlackTokens } from './queries'

export default function ConnectSlack() {
  const [searchParams] = useSearchParams()
  const [isStateCorrect, setIsStateCorrect] = useState(false)

  const code = searchParams.get('code') ?? ''
  const state = searchParams.get('state') ?? ''

  useEffect(() => {
    try {
      if (state === storage.get('state')) {
        setIsStateCorrect(true)
      } else {
        message.error('Incorrect state parameter. Please try again.')
        window.close()
      }
    } finally {
      storage.remove('state')
    }
  }, [state])

  useQuery(['slack', code], () => fetchSlackTokens({ code }), {
    onSuccess: () => {
      window.close()
    },
    enabled: isStateCorrect,
  })

  return null
}
