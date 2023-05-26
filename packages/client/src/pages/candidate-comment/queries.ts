import { Comment } from '@prisma/client'
import type { User } from 'firebase/auth'
import client from 'utils/client'

type CreateCommentPayload = {
  content: Object
  candidateId: string
}

export async function fetchComments(candidateId: string) {
  const { data } = await client.get<(Comment & { User: User })[]>(
    `candidates/${candidateId}/comments`,
  )
  return data
}

export async function createComment(payload: CreateCommentPayload) {
  const { data } = await client.post<Comment>('/comments', payload)
  return data
}
