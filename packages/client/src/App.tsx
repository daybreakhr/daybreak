import { ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Auth from 'components/auth'
import Login from 'pages/login'
import Home from 'pages/home'
import AuthLayout from 'components/auth-layout'
import AppShell from 'components/app-shell'
import Candidates from 'pages/candidates'
import Members from 'pages/members'
import Jobs from 'pages/jobs'
import CreateJob from 'pages/create-job'
import Candidate from 'pages/candidate'
import Organisation from 'pages/organisation'
import PublishJob from 'pages/publish-job'
import Job from 'pages/job'
import Onboarding from 'pages/onboarding'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: '#9155fd' } }}>
        <Auth>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/" element={<AuthLayout component={AppShell} />}>
                <Route path="home" element={<Home />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="jobs/:jobId" element={<Job />} />
                <Route path="jobs/:jobId/create" element={<CreateJob />} />
                <Route path="jobs/:jobId/publish" element={<PublishJob />} />
                <Route path="candidates" element={<Candidates />} />
                <Route path="candidates/:candidateId" element={<Candidate />} />
                <Route
                  path="settings/organisation"
                  element={<Organisation />}
                />
                <Route path="settings/members" element={<Members />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Auth>
      </ConfigProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
