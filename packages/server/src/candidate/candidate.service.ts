import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Express } from 'express'

import { PrismaService } from 'src/prisma.service'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { AffindaService } from 'src/affinda/affinda.service'
import { AuthService } from 'src/auth/auth.service'
import { NotificationService } from 'src/notification/notification.service'
import { CreateCandidateDto, UpdateCandidateDto } from './candidate.dto'

@Injectable()
export class CandidateService {
  constructor(
    private affindaService: AffindaService,
    private s3Service: AWSS3Service,
    private authService: AuthService,
    private notificationService: NotificationService,
    private prismaService: PrismaService,
  ) {}

  async getById(id: string) {
    const candidate = await this.prismaService.candidate.findUnique({
      where: { id },
      include: { Job: { include: { Interview: true } } },
    })

    if (candidate.referredBy) {
      const user = await this.authService.getUser(candidate.referredBy)
      return { ...candidate, ReferredBy: user }
    }

    return { ...candidate, ReferredBy: null }
  }

  async getCalendarEventsForCandidate(candidateId: string) {
    const calendarEvents = await this.prismaService.calendar.findMany({
      where: { candidateId },
      orderBy: { createdAt: 'desc' },
    })

    return calendarEvents
  }

  async getEmailsForCandidate(candidateId: string) {
    const emailEvents = await this.prismaService.email.findMany({
      where: { candidateId },
      orderBy: { createdAt: 'desc' },
    })

    return emailEvents
  }

  async create(
    file: Express.Multer.File,
    createCandidateDto: CreateCandidateDto,
  ) {
    const { jobId, workspaceId, ...restParams } = createCandidateDto

    const isApplied = await this.prismaService.candidate.findFirst({
      where: {
        email: createCandidateDto.email,
        phone: createCandidateDto.phone,
        jobId,
      },
    })

    if (isApplied) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "You've already applied for this job",
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const { id, affindaId, Job } = await this.prismaService.candidate.create({
      data: {
        ...restParams,
        Workspace: { connect: { id: workspaceId } },
        Job: { connect: { id: jobId } },
      },
      include: { Job: true },
    })

    const key = `candidate/${id}/${file.originalname}`
    const uploadResult = await this.s3Service.uploadS3({
      file: file.buffer,
      key,
      mimetype: file.mimetype,
    })

    let matchScore: number

    if (affindaId && Job.affindaId) {
      const data = await this.affindaService.matchResumeAgainstJobDescription(
        affindaId,
        Job.affindaId,
      )

      matchScore = data?.score
    }

    const candidate = await this.prismaService.candidate.update({
      where: { id },
      data: {
        resume: uploadResult.Location,
        matchScore: matchScore ? +(matchScore * 100).toFixed(0) : undefined,
      },
    })

    this.notificationService.candidateAppliedNotification(jobId, candidate)

    return candidate
  }

  async update(candidateId: string, updateCandidateDto: UpdateCandidateDto) {
    const candidate = this.prismaService.candidate.update({
      where: { id: candidateId },
      data: { ...updateCandidateDto },
    })

    return candidate
  }

  async delete(candidateId: string) {
    const candidate = await this.prismaService.candidate.delete({
      where: { id: candidateId },
    })
    return candidate
  }
}
