import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default openai
