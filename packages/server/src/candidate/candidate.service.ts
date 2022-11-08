import { Express } from 'express'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCandidateDto } from './candidate.dto'
import { S3Service } from 'src/s3.service'

@Injectable()
export class CandidateService {
  constructor(
    private prismaService: PrismaService,
    private s3Service: S3Service,
  ) {}

  async getAll(workspaceId: string) {
    const candidates = await this.prismaService.candidate.findMany({
      where: { workspaceId },
      include: { Job: true },
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

    return candidate
  }
}
