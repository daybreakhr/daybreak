import { Avatar, Button, List, Switch } from 'antd'
import LinkedInIcon from 'assets/icons/linkedin.svg'
import InternshalaIcon from 'assets/icons/internshala.svg'
import CareerPortalIcon from 'assets/icons/career-portal.svg'
import NaukriIcon from 'assets/icons/naukri.svg'

const data = [
  {
    icon: CareerPortalIcon,
    title: 'Career Portal',
    active: true,
    isComingSoon: false,
  },
  {
    icon: NaukriIcon,
    title: 'Naukri',
    active: true,
    isComingSoon: true,
  },
  {
    icon: InternshalaIcon,
    title: 'Internshala',
    active: true,
    isComingSoon: true,
  },
  {
    icon: LinkedInIcon,
    title: 'Linkedin',
    active: true,
    isComingSoon: true,
  },
]

export default function JobPublish() {
  return (
    <div>
      <div className="my-8">
        <p className="text-xl font-semibold">Publish Your Job</p>
        <p className="text-sm text-gray-500">
          You are ready to start hiring process.
        </p>
      </div>

      <p className="text-xs">Publish on</p>
      <div className="my-3">
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={(item, key) => (
            <List.Item
              actions={
                item.isComingSoon
                  ? [
                      <p className="text-xs" key={key}>
                        COMING SOON
                      </p>,
                    ]
                  : [<Switch key={key} size="small" />]
              }
            >
              <List.Item.Meta
                avatar={<Avatar shape="square" src={item.icon} />}
                title={
                  <p className="mt-1 text-sm font-semibold">{item.title}</p>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <div className="mt-3">
        <Button size="large" type="primary" className="w-full">
          Publish Job
        </Button>
      </div>
    </div>
  )
}
