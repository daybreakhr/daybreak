import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { PrismaService } from 'src/prisma.service'
import { CreateCommentDto } from './comments.dto'

@Injectable()
export class CommentsService {
  constructor(
    private eventEmitter: EventEmitter2,
    private prismaService: PrismaService,
  ) {}

  async createComment(createCommentDto: CreateCommentDto, userId: string) {
    const { content, candidateId } = createCommentDto
    const data = await this.prismaService.comment.create({
      data: {
        content,
        Member: { connect: { uid: userId } },
        Candidate: { connect: { id: candidateId } },
      },
      include: { Candidate: true },
    })
    this.eventEmitter.emit('comment.created', data)
    return data
  }

  async deleteComment(id: string) {
    const data = await this.prismaService.comment.delete({
      where: { id },
    })
    return data
  }
}
