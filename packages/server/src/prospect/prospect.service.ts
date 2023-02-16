import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { isEmpty } from 'lodash'
import { AffindaService } from 'src/affinda/affinda.service'
import { Express } from 'express'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import { CreateProspectDto, Prospect } from './prospect.dto'

@Injectable()
export class ProspectService {
  constructor(
    private s3Service: AWSS3Service,
    private prismaService: PrismaService,
    private affindaService: AffindaService,
  ) {}

  async getAll(workspaceId: string) {
    const prospects = await this.prismaService.prospect.findMany({
      where: { workspaceId },
      include: { Jobs: true },
    })
    return prospects
  }

  async getProspect(prospectId: string) {
    const prospect = await this.prismaService.prospect.findUnique({
      where: { id: prospectId },
    })
    return prospect
  }

  async create(
    workspaceId: string,
    file: Express.Multer.File,
    prospectBody: CreateProspectDto,
  ) {
    const { id } = await this.prismaService.prospect.create({
      data: {
        ...prospectBody,
        Workspace: { connect: { id: workspaceId } },
        Jobs: {
          connect: prospectBody.jobIds.map((jobId) => ({
            id: jobId,
          })),
        },
      },
    })

    const key = `prospect/${id}/${file.originalname}`
    const uploadResult = await this.s3Service.uploadS3(file, key)

    const prospect = await this.prismaService.prospect.update({
      where: { id },
      data: { resume: uploadResult.Location },
    })

    return prospect
  }

  async addToCandidate(prospectId: string, jobId: string) {
    if (!isEmpty(jobId)) {
      const { workspaceId, ...restProspectParams } =
        await this.prismaService.prospect.findFirst({
          where: { id: prospectId },
        })

      const identifier = await this.affindaService.uploadResume(
        restProspectParams.resume,
      )

      if (!isEmpty(restProspectParams)) {
        await this.prismaService.candidate.create({
          data: {
            ...restProspectParams,
            affindaId: identifier,
            Job: { connect: { id: jobId } },
            Workspace: { connect: { id: workspaceId } },
          },
        })
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Invalid Prospect ID',
          },
          HttpStatus.BAD_REQUEST,
        )
      }

      return { workspaceId, ...restProspectParams }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid Job ID',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async update(prospectId: string, prospectBody: Partial<Prospect>) {
    if (!isEmpty(prospectBody)) {
      const prospect = await this.prismaService.prospect.update({
        where: { id: prospectId },
        data: {
          ...prospectBody,
          Jobs: {
            connect: prospectBody.jobIds.map((jobId) => ({
              id: jobId,
            })),
          },
        },
      })
      return prospect
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

  async delete(prospectId: string) {
    const prospect = await this.prismaService.prospect.delete({
      where: { id: prospectId },
    })
    return prospect
  }
}
