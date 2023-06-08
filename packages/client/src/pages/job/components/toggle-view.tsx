import { Divider } from 'antd'
import { ReactComponent as KanbanIcon } from 'assets/icons/kanban.svg'
import { ReactComponent as BulletListIcon } from 'assets/icons/bullet-list.svg'
import clsx from 'clsx'

type ToggleViewProps = {
  viewType: 'table' | 'kanban'
  onChange: (value: 'table' | 'kanban') => void
}

export default function ToggleView({ viewType, onChange }: ToggleViewProps) {
  return (
    <div className="flex items-center bg-white border rounded-md">
      <button
        title="Table"
        onClick={() => onChange('table')}
        className={clsx('py-1.5 pl-2 bg-transparent focus:outline-none', {
          'text-primary-500': viewType === 'table',
        })}
      >
        <BulletListIcon />
      </button>
      <Divider type="vertical" />
      <button
        title="Kanban"
        onClick={() => onChange('kanban')}
        className={clsx('py-1.5 pr-2 bg-transparent focus:outline-none', {
          'text-primary-500': viewType === 'kanban',
        })}
      >
        <KanbanIcon />
      </button>
    </div>
  )
}
