import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from 'components/auth'
import Login from 'pages/login'
import Home from 'pages/home'
import AuthLayout from 'components/auth-layout'
import AppShell from 'components/app-shell'
import Candidate from 'pages/candidate'

export default function App() {
  return (
    <Auth>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<AuthLayout component={AppShell} />}>
            <Route path="home" element={<Home />} />
            <Route path="candidate" element={<Candidate />} />
            <Route path="job-management" element={<Home />} />
            <Route path="team-management" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Auth>
  )
}
