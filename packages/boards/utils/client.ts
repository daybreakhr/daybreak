import Axios from 'axios'

const client = Axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
})

export default client
