import { ConfigProvider } from 'antd'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Auth from 'components/auth'
import Login from 'pages/login'
import Home from 'pages/home'
import AuthLayout from 'components/auth-layout'
import AppShell from 'components/app-shell'
import Members from 'pages/members'
import AllJobs from 'pages/all-jobs'
import CreateJob from 'pages/create-job'
import Organisation from 'pages/organisation'
import Job from 'pages/job'
import Onboarding from 'pages/onboarding'
import CreateWorkspace from 'pages/create-workspace'
import SetupWorkspace from 'pages/setup-workspace'
import ValidateInvite from 'pages/validate-invite'
import InviteToWorkspace from 'pages/invite-to-workspace'
import Logrocket from 'components/logrocket'
import PrivacyPolicy from 'pages/privacy-policy'
import ConnectSlack from 'pages/connect-slack'
import EmailTemplates from 'pages/email-templates'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: '#8441FC' } }}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
          <Auth>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/onboarding" element={<Onboarding />}>
                  <Route path="" element={<Navigate to="create" />} />
                  <Route path="create" element={<CreateWorkspace />} />
                  <Route path="setup" element={<SetupWorkspace />} />
                  <Route path="invite" element={<InviteToWorkspace />} />
                </Route>

                <Route path="/invite/:inviteId" element={<ValidateInvite />} />
                <Route
                  path="/slack/connect"
                  element={<AuthLayout component={ConnectSlack} />}
                />
                <Route path="/" element={<AuthLayout component={AppShell} />}>
                  {/* new routes for create job V2 */}
                  <Route path="dashboard" element={<Home />} />
                  <Route path="jobs" element={<AllJobs />} />
                  <Route path="jobs/:jobId" element={<Job />} />
                  <Route
                    path="jobs/:jobId/:mode/:step"
                    element={<CreateJob />}
                  />
                  <Route
                    path="settings"
                    element={<Navigate to="organisation" replace />}
                  />
                  <Route
                    path="settings/organisation"
                    element={<Organisation />}
                  />
                  <Route path="settings/members" element={<Members />} />
                  <Route
                    path="settings/email-templates"
                    element={<EmailTemplates />}
                  />
                </Route>
              </Routes>
              {import.meta.env.PROD && <Logrocket />}
            </BrowserRouter>
          </Auth>
        </GoogleOAuthProvider>
      </ConfigProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  )
}
