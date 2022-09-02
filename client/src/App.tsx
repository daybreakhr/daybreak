import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from 'components/auth'
import Login from 'pages/login'
import Home from 'pages/home'

export default function App() {
  return (
    <Auth>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Auth>
  )
}
