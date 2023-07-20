import React from 'react'
import dayjs from 'dayjs'
import ReactDOM from 'react-dom/client'
import updateLocale from 'dayjs/plugin/updateLocale'
import relativeTime from 'dayjs/plugin/relativeTime'

import App from 'App'
import 'remirror/styles/all.css'
import 'antd/dist/reset.css'
import './styles/index.css'
import 'styles/preflight.css'

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few secs',
    m: 'a min',
    mm: '%d min',
    h: 'an hr',
    hh: '%d hr',
    d: 'a d',
    dd: '%d d',
    M: 'a mo',
    MM: '%d mo',
    y: 'a yr',
    yy: '%d yr',
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
