export class CreateCommentDto {
  content: any
  candidateId: string
}

export class CommentDto extends CreateCommentDto {
  id: string
  createdAt: Date
}
