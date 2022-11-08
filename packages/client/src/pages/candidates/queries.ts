import client from 'utils/client'
import type { Candidate } from '@prisma/client'

const WORKSPACE_ID = import.meta.env.VITE_WORKSPACE_ID

export async function fetchCandidate() {
    const { data } = await client.get<Candidate[]>(`${WORKSPACE_ID}/candidates`)
    return data
}

  export async function createCandidate() {
    const { data } = await client.post<Candidate>(`${WORKSPACE_ID}/candidates`)
    return data
}
