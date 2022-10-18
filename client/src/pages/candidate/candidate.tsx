import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Profile from './components/profile'
import Details from './components/details'
import Feedback from './components/feedback'

export default function Candidate() {
  return (
    <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
      <Link to="/candidates" className="flex items-center mb-4 space-x-2">
        <AiOutlineArrowLeft />
        <span>All Candidates</span>
      </Link>

      <div className="flex flex-1 space-x-4">
        <div className="flex-1 overflow-hidden rounded-md">
          <Tabs>
            <Tabs.TabPane tab="Candidate Profile" key="profile">
              <Profile />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Feedback" key="feedback">
              <Feedback />
            </Tabs.TabPane>
          </Tabs>
        </div>

        <Details />
      </div>
    </div>
  )
}
