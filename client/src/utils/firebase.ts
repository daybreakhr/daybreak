import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const app = initializeApp({
  apiKey: 'AIzaSyC4dwsorswISBdgIPedcNnJyRMY13WSlKg',
  authDomain: 'daybreakhr-c855d.firebaseapp.com',
  projectId: 'daybreakhr-c855d',
  storageBucket: 'daybreakhr-c855d.appspot.com',
  messagingSenderId: '597053514881',
  appId: '1:597053514881:web:7f4d07d1c052defdb3d980',
})

export const auth = getAuth(app)

export const googleAuthProvider = new GoogleAuthProvider()
