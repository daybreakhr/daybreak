import Axios from 'axios'
import { auth } from './firebase'

const client = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

client.interceptors.request.use(async (config) => {
  const currentUser = auth.currentUser
  if (currentUser) {
    const idToken = await currentUser.getIdToken()
    return {
      ...config,
      headers: {
        Authorization: idToken,
      },
    }
  }
  return config
})

export default client
