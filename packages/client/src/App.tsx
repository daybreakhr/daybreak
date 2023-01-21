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
import Candidates from 'pages/candidates'
import Members from 'pages/members'
import Jobs from 'pages/jobs'
import CreateJob from 'pages/create-job'
import Candidate from 'pages/candidate'
import Organisation from 'pages/organisation'
import PublishJob from 'pages/publish-job'
import Job from 'pages/job'
import Onboarding from 'pages/onboarding'
import CreateWorkspace from 'pages/create-workspace'
import SetupWorkspace from 'pages/setup-workspace'
import CandidateProfile from 'pages/candidate-profile'
import CandidateFeedback from 'pages/candidate-feedback'
import JobOverview from 'pages/job-overview'
import JobPipeline from 'pages/job-pipeline'
import ValidateInvite from 'pages/validate-invite'
import InviteToWorkspace from 'pages/invite-to-workspace'
import CandidateEngagement from 'pages/candidate-engagement'
import Integrations from 'pages/integrations'
import CreateCandidate from 'pages/create-candidate'
import Logrocket from 'components/logrocket'
import PrivacyPolicy from 'pages/privacy-policy'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: '#9155fd' } }}>
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
                <Route path="/" element={<AuthLayout component={AppShell} />}>
                  <Route path="home" element={<Home />} />
                  <Route path="jobs" element={<Jobs />} />
                  <Route path="jobs/:jobId" element={<Job />}>
                    <Route
                      path=""
                      element={<Navigate to="overview" replace />}
                    />
                    <Route path="overview" element={<JobOverview />} />
                    <Route path="pipeline" element={<JobPipeline />} />
                    <Route path="*" element={<Navigate to="overview" />} />
                  </Route>
                  <Route path="jobs/:jobId/create" element={<CreateJob />} />
                  <Route path="jobs/:jobId/edit" element={<CreateJob />} />
                  <Route path="jobs/:jobId/publish" element={<PublishJob />} />
                  <Route path="candidates" element={<Candidates />} />
                  <Route
                    path="candidates/create"
                    element={<CreateCandidate />}
                  />

                  <Route path="candidates/:candidateId" element={<Candidate />}>
                    <Route
                      path=""
                      element={<Navigate to="profile" replace />}
                    />
                    <Route path="profile" element={<CandidateProfile />} />
                    <Route path="feedback" element={<CandidateFeedback />} />
                    <Route
                      path="engagement"
                      element={<CandidateEngagement />}
                    />
                    <Route path="*" element={<Navigate to="profile" />} />
                  </Route>
                  <Route
                    path="settings"
                    element={<Navigate to="members" replace />}
                  />
                  <Route
                    path="settings/organisation"
                    element={<Organisation />}
                  />
                  <Route path="settings/members" element={<Members />} />
                  <Route
                    path="settings/integrations"
                    element={<Integrations />}
                  />
                </Route>
              </Routes>
              {import.meta.env.PROD && <Logrocket />}
            </BrowserRouter>
          </Auth>
        </GoogleOAuthProvider>
      </ConfigProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
