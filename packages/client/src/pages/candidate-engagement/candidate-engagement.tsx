import { useEffect, useState } from 'react'
import { Button, Empty } from 'antd'
import { gapiLoaded } from 'utils/calendar'
import ScheduleModal from './components/schedule-modal'

export default function CandidateEngagement() {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)

  useEffect(() => {
    gapiLoaded()
  }, [])

  return (
    <div className="p-4 text-gray-800 bg-white shadow-md rounded-b-md">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold">Candidate Engagement</p>
      </div>

      <div className="flex items-center justify-center h-80">
        <Empty description="There is no engagement history with the candidate yet...">
          <Button onClick={() => setIsCalendarModalOpen(true)}>
            Schedule Interview
          </Button>
        </Empty>
      </div>

      <ScheduleModal
        isModalOpen={isCalendarModalOpen}
        onCancel={() => setIsCalendarModalOpen(false)}
      />
    </div>
  )
}
