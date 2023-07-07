import { Drawer } from 'antd'
import Details from './components/details'
import Actions from './components/actions'
import CandidateTabs from './components/candidate-tabs'

type CandidateProps = {
  isOpen: boolean
  onClose: () => void
}

export default function Candidate({ isOpen, onClose }: CandidateProps) {
  return (
    <Drawer
      height="85%"
      open={isOpen}
      closable={false}
      onClose={onClose}
      placement="bottom"
      className="rounded-t-lg"
      bodyStyle={{ padding: 0 }}
    >
      <div className="flex h-full max-w-6xl mx-auto">
        <Details />
        <CandidateTabs />
        <Actions />
      </div>
    </Drawer>
  )
}
