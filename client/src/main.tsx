import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App'
import './styles/index.css'
import 'antd/dist/antd.less'
import Login from './pages/login'
import Home from './pages/home'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
