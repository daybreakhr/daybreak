import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Profile from './components/profile'
import Details from './components/details'

export default function Candidate() {
  return (
    <div className="px-8 pt-4 pb-8 flex-1 flex flex-col">
      <Link to="/candidates" className="mb-4 flex items-center space-x-2">
        <AiOutlineArrowLeft />
        <span>All Candidates</span>
      </Link>

      <div className="flex space-x-4 flex-1">
        <div className="rounded-md w-2/3 overflow-hidden">
          <Tabs>
            <Tabs.TabPane tab="Candidate Profile" key="profile">
              <Profile />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Engagement" key="engagement" />
            <Tabs.TabPane tab="Feedback" key="feedback" />
          </Tabs>
        </div>

        <Details />
      </div>
    </div>
  )
}
