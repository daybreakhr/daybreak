import { JobType, CandidateStatus, Interview } from '@prisma/client'

export const candidateStatusOptions = [
  { label: 'Sourced', value: CandidateStatus.sourced },
  { label: 'Applied', value: CandidateStatus.applied },
  { label: 'Interview', value: CandidateStatus.interview },
  { label: 'Offered', value: CandidateStatus.offered },
  { label: 'Accepted', value: CandidateStatus.accepted },
]

export function getJobType(jobType: JobType | null | undefined) {
  switch (jobType) {
    case JobType.fullTime:
      return 'Full Time'
    case JobType.contract:
      return 'Contract'
    case JobType.internship:
      return 'Internship'
    case JobType.partTime:
      return 'Part Time'
    default:
      return ''
  }
}

export const downloadFile = (url: string, filename?: string) => {
  if (!url) return

  try {
    fetch(url || '').then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob)
        const alink = document.createElement('a')
        alink.href = fileURL
        alink.download = filename ?? `document_${new Date()}.pdf`
        alink.click()
        alink.remove()
      })
    })
  } catch (error) {}
}

export function getPipelineStages(interviews: Interview[]) {
  return [
    ...candidateStatusOptions.slice(0, 2),
    ...interviews.map(({ id, title }) => {
      return { label: title, value: id }
    }),
    ...candidateStatusOptions.slice(2),
  ]
}
