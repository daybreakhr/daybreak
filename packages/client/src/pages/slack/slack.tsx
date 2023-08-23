import { v4 as uuidv4 } from 'uuid'
import { Button, Divider } from 'antd'
import { ReactComponent as SlackIcon } from 'assets/icons/slack.svg'
import { ReactComponent as Check } from 'assets/icons/Check.svg'
import { Card, storage } from 'ui-kit'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function Slack() {
  const navigate = useNavigate()
  function handleSlackConnect() {
    const state = uuidv4()
    storage.set('state', state)

    window.open(
      `https://slack.com/oauth/v2/authorize?client_id=4045216441856.5071419400464&scope=chat:write,commands,im:write,users:read,files:read&state=${state}`,
      '_blank',
    )
  }

  return (
    <div className="flex-1">
      <div className="w-[512px] mx-auto py-6">
        <div className="text-center">
          <div className="flex items-center justify-center ">
            <SlackIcon />
          </div>

          <p className="mt-6 mb-2 text-2xl font-semibold">Connect to Slack</p>
          <p className="text-base text-gray-500">
            Daybreak app in Slack let&apos;s you handle the most of the Hiring
            related actions right in Slack.
          </p>
        </div>

        <div className="py-12">
          <Card className="px-8 py-8 ">
            <div className="flex space-x-3 w-[448px]">
              <div>
                <Check className="mt-2" />
              </div>
              <div className="text-base font-normal">
                Schedule and manage interviews directly within Slack.
              </div>
            </div>
            <Divider className="my-5" />
            <div className="flex space-x-3  w-[448px] ">
              <div>
                <Check className="mt-2" />
              </div>
              <div className="text-base font-normal">
                Add feedback for candidates.
              </div>
            </div>
            <Divider className="my-5" />
            <div className="flex space-x-3  w-[448px] ">
              <div>
                <Check className="mt-2" />
              </div>
              <div className="text-base font-normal">
                Let your team know when a new job is posted.
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center px-5 py-3 ">
          <Button
            type="primary"
            size="large"
            className="m-auto w-[336px] bg-primary-500"
            onClick={handleSlackConnect}
          >
            <div className="text-sm font-medium leading-snug text-center text-white">
              Connect to Slack
            </div>
            <div className="ml-4 text-base leading-snug tracking-tight text-center text-white">
              <FaArrowRight />
            </div>
          </Button>
        </div>
        <div onClick={() => navigate('/dashboard')}>
          <p className="mt-8 text-sm text-center text-gray-500 cursor-pointer text-normal">
            I&apos;ll do it later
          </p>
        </div>
      </div>
    </div>
  )
}
