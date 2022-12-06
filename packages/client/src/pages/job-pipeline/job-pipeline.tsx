import StatusList from './components/status-list'

export default function JobPipeline() {
  return (
    <div className="flex flex-1 gap-6 p-8 overflow-x-auto">
      <StatusList title="Applied" length={8} />
      <StatusList title="Interviewing" length={5} />
      <StatusList title="Offer Extended" length={2} />
      <StatusList title="Accepted" length={1} />
      <StatusList title="Rejected" length={10} />
    </div>
  )
}
