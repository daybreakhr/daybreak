import { Express } from 'express'
import { Candidate } from '@prisma/client'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma.service'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { NotificationService } from 'src/notification/notification.service'
import { CreateCandidateDto } from './candidate.dto'

@Injectable()
export class CandidateService {
  constructor(
    private s3Service: AWSS3Service,
    private notificationService: NotificationService,
    private prismaService: PrismaService,
  ) {}

  async getAll(workspaceId: string) {
    const candidates = await this.prismaService.candidate.findMany({
      where: { workspaceId },
      include: { Job: true, Feedback: true },
    })

    return candidates
  }

  async getById(id: string) {
    const candidate = await this.prismaService.candidate.findUnique({
      where: { id },
      include: { Job: true },
    })
    return candidate
  }

  async create(
    workspaceId: string,
    file: Express.Multer.File,
    createCandidateDto: CreateCandidateDto,
  ) {
    const { jobId, ...restParams } = createCandidateDto

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

    const { id } = await this.prismaService.candidate.create({
      data: {
        ...restParams,
        Workspace: { connect: { id: workspaceId } },
        Job: { connect: { id: jobId } },
      },
    })

    const key = `candidate/${id}/${file.originalname}`
    const uploadResult = await this.s3Service.uploadS3(file, key)

    const candidate = await this.prismaService.candidate.update({
      where: { id },
      data: { resume: uploadResult.Location },
    })

    this.notificationService.candidateAppliedNotification(jobId, candidate)

    return candidate
  }

  async update(candidateId: string, updateCandidateDto: Partial<Candidate>) {
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
