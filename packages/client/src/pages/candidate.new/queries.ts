import client from 'utils/client'
import { Comment } from '@prisma/client'
import type { User } from 'firebase/auth'
import { Candidate } from 'types/candidate'

export async function fetchCandidate(candidateId: string) {
  const { data } = await client.get<Candidate>(`candidates/${candidateId}`)
  return data
}

export async function fetchComments(candidateId: string) {
  const { data } = await client.get<(Comment & { User: User })[]>(
    `candidates/${candidateId}/comments`,
  )
  return data
}

type CreateCommentPayload = {
  content: Object
  candidateId: string
}

export async function createComment(payload: CreateCommentPayload) {
  const { data } = await client.post<Comment>('/comments', payload)
  return data
}
