import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCommentDto } from './comments.dto'

@Injectable()
export class CommentsService {
  constructor(private prismaService: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto, userId: string) {
    const data = await this.prismaService.comment.create({
      data: {
        content: createCommentDto.content,
        Member: { connect: { id: userId } },
        Candidate: { connect: { id: createCommentDto.candidateId } },
      },
    })
    return data
  }

  async deleteComment(id: string) {
    const data = await this.prismaService.comment.delete({
      where: { id },
    })
    return data
  }
}
