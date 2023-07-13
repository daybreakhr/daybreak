import { isEmpty } from 'lodash'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import type { UserRecord } from 'firebase-admin/auth'
import { CreateFeedbackDto, Feedback } from './feedback.dto'

@Injectable()
export class FeedbackService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async getAll(candidateId: string): Promise<Feedback[]> {
    const feedbacks = await this.prismaService.feedback.findMany({
      where: { candidateId },
    })

    // get user object using `createdBy` field
    const identifiers = feedbacks.map(({ createdBy }) => ({ uid: createdBy }))
    const users = await this.authService.getUsers(identifiers)
    const usersById = users.reduce(
      (acc, user) => ({ ...acc, [user.uid]: user }),
      {},
    )

    return feedbacks.map((feedback) => ({
      ...feedback,
      User: usersById[feedback.createdBy] as UserRecord,
    }))
  }

  async getFeedback(feedbackId: string): Promise<Feedback> {
    const feedback = await this.prismaService.feedback.findUnique({
      where: { id: feedbackId },
      include: { Member: true },
    })
    return feedback
  }

  async create(
    createdBy: string,
    feedbackBody: CreateFeedbackDto,
  ): Promise<Feedback> {
    const { candidateId, ...restValues } = feedbackBody
    const feedback = await this.prismaService.feedback.create({
      data: {
        ...restValues,
        Member: { connect: { uid: createdBy } },
        Candidate: { connect: { id: candidateId } },
      },
    })

    return feedback
  }

  async update(
    feedbackId: string,
    feedbackBody: Partial<Feedback>,
  ): Promise<Feedback> {
    if (!isEmpty(feedbackBody)) {
      const feedback = await this.prismaService.feedback.update({
        where: { id: feedbackId },
        data: feedbackBody,
      })
      return feedback
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Request body is not available',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async delete(feedbackId: string): Promise<Feedback> {
    const feedback = await this.prismaService.feedback.delete({
      where: { id: feedbackId },
    })
    return feedback
  }
}
