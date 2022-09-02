import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from 'components/auth'
import Login from 'pages/login'
import Home from 'pages/home'
import AuthLayout from 'components/auth-layout'

export default function App() {
  return (
    <Auth>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<AuthLayout component={Home} />} />
        </Routes>
      </BrowserRouter>
    </Auth>
  )
}
