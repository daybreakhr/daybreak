import { Button, Form, Input, Select } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { Show } from 'ui-kit'

const { Option } = Select

export default function QueryPage() {
  const [form] = Form.useForm()

  const [response, setResponse] = useState('')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const formValues = form.getFieldsValue()
    try {
      const result = await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/completions',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
        data: {
          prompt: formValues.prefix + ' ' + prompt,
          model: 'text-davinci-003',
          temperature: 0.5,
          max_tokens: 250,
        },
      })
      setResponse(result.data.choices[0].text)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
    setLoading(false)
  }

  return (
    <>
      <div className="m-4 bg-white center">
        <div className="p-4">
          <p className="py-2 text-2xl font-medium text-purple-600">Ask Psych</p>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <div className="flex justify-around space-x-4">
              <Form.Item name="prefix" className="w-72">
                <Select defaultValue="generate a job description for">
                  <Option value="generate a job description for">
                    Generate a JD for
                  </Option>
                  <Option value="write a linkedin post for">
                    Write a Linkedin Post for
                  </Option>
                  <Option value="interview questions i could ask for">
                    Interview questions i could ask for
                  </Option>
                  <Option value="what are the right skills for">
                    What are the right skills for
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item className="flex-1">
                <Input onChange={(e) => setPrompt(e.target.value)} />
              </Form.Item>
            </div>
            <Form.Item>
              <Button type="primary" disabled={loading} htmlType="submit">
                {loading ? 'Loading...' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>

          <Show when={response}>
            <div className="flex flex-col items-center p-4 mx-5 mt-10 bg-gray-200">
              <p>{response}</p>
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}
