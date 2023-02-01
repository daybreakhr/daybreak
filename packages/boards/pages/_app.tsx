import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import 'styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: '#9155fd' } }}>
        <Component {...pageProps} />
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default MyApp
