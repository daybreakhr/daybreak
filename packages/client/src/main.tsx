import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'App'
import 'remirror/styles/all.css'
import 'antd/dist/reset.css'
import './styles/index.css'
import 'styles/preflight.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
