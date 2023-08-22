import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons'
import { Button, Divider } from 'antd'
import { ReactComponent as SlackIcon } from 'assets/icons/slack.svg'
import { Card } from 'ui-kit'

export default function Slack() {
  return (
    <div className="flex-1">
      <div className="w-[512px] mx-auto py-[126px]">
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
                <CheckOutlined className="text-purple-500 " />
              </div>
              <div className="text-base font-normal">
                Schedule and manage interviews directly within Slack.
              </div>
            </div>
            <Divider className="my-5" />
            <div className="flex space-x-3  w-[448px] ">
              <div>
                <CheckOutlined className="text-purple-500" />
              </div>
              <div className="text-base font-normal">
                Add feedback for candidates.
              </div>
            </div>
            <Divider className="my-5" />
            <div className="flex space-x-3  w-[448px] ">
              <div>
                <CheckOutlined className="text-purple-500" />
              </div>
              <div className="text-base font-normal">
                Let your team know when a new job is posted.
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-center ">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="m-auto bg-purple-500 w-80"
          >
            <span>Connect to slack</span>
            <ArrowRightOutlined />
          </Button>
        </div>
        <p className="mt-8 text-sm text-center text-gray-500 text-normal">
          I&apos;ll do it later
        </p>
      </div>
    </div>
  )
}
