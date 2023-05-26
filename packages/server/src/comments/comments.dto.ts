export class CreateCommentDto {
  content: any
  createdBy: string
  candidateId: string
}

export class CommentDto extends CreateCommentDto {
  id: string
  createdAt: Date
}
