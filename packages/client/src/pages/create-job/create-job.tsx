import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import JobForm from './components/job-form'

export default function CreateJobs() {
  return (
    <div className="flex flex-col flex-1 px-8 pt-4 pb-8">
      <Link to="/jobs" className="flex items-center mb-4 space-x-2">
        <AiOutlineArrowLeft />
        <span>Jobs List</span>
      </Link>

      <div className="p-6 bg-white rounded-md shadow-md">
        <p className="mb-4 font-sans text-xl font-medium">Create Job</p>
        <JobForm />
      </div>
    </div>
  )
}
