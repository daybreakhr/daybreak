import { fetchCandidates } from 'pages/candidates/queries'

export async function fetchCandidatesByJob(jobId: string) {
  const candidates = await fetchCandidates()
  return candidates.filter((candidate) => candidate.jobId === jobId)
}
