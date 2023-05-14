import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getRemoteConfig } from 'firebase/remote-config'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Initialize Firebase
const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
})

export const auth = getAuth(app)

export const analytics = getAnalytics(app)

export const remoteConfig = getRemoteConfig(app)

export const googleAuthProvider = new GoogleAuthProvider()
