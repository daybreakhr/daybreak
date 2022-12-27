import { useMemo } from 'react'
import { Card } from 'antd'
import { groupBy } from 'lodash'
import { Funnel, FunnelChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Candidate } from 'types/candidate'

type TalentPipelineProps = {
  data: Candidate[] | undefined
}

export default function TalentFunnel({ data }: TalentPipelineProps) {
  const candidatesByStatus = useMemo(() => {
    const candidateGroups = groupBy(data, (c) => c.status)
    return [
      {
        name: 'Applied',
        value: candidateGroups?.applied?.length,
        fill: '#f59e0b',
      },
      {
        name: 'Interviewing',
        value: candidateGroups?.interview?.length,
        fill: '#84cc16',
      },
      {
        name: 'Offer Extended',
        value: candidateGroups?.offered?.length,
        fill: '#6366f1',
      },
      {
        name: 'Accepted',
        value: candidateGroups?.accepted?.length,
        fill: '#ef4444',
      },
    ]
  }, [data])

  return (
    <Card>
      <p className="text-black/[0.45] mb-6">Talent Funnel</p>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel data={candidatesByStatus} dataKey="value" />
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
