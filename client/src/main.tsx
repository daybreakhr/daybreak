import React from 'react'
import './styles/index.css'
import 'antd/dist/antd.less'
import MainRouter from './route'
import ReactDOM from 'react-dom/client'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
)
