import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { isEmpty } from 'lodash'
import { CreateProspectDto, Prospect } from './prospect.dto'

@Injectable()
export class ProspectService {
  constructor(private prismaService: PrismaService) {}

  async getAll(workspaceId: string): Promise<Prospect[]> {
    const prospects = await this.prismaService.prospect.findMany({
      where: { workspaceId },
    })

    return prospects
  }

  async getProspect(prospectId: string): Promise<Prospect> {
    const prospect = await this.prismaService.prospect.findUnique({
      where: { id: prospectId },
    })
    return prospect
  }

  async create(
    workspaceId: string,
    prospectBody: CreateProspectDto,
  ): Promise<Prospect> {
    const prospect = await this.prismaService.prospect.create({
      data: {
        ...prospectBody,
        Workspace: { connect: { id: workspaceId } },
      },
    })

    return prospect
  }

  async addToCandidate(prospectId: string, jobId: string): Promise<Prospect> {
    if (!isEmpty(jobId)) {
      const { workspaceId, ...restProspectParams }: Prospect =
        await this.prismaService.prospect.findFirst({
          where: { id: prospectId },
        })

      if (!isEmpty(restProspectParams)) {
        await this.prismaService.candidate.create({
          data: {
            ...restProspectParams,
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

  async update(
    prospectId: string,
    prospectBody: Partial<Prospect>,
  ): Promise<Prospect> {
    if (!isEmpty(prospectBody)) {
      const prospect = await this.prismaService.prospect.update({
        where: { id: prospectId },
        data: prospectBody,
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

  async delete(prospectId: string): Promise<Prospect> {
    const prospect = await this.prismaService.prospect.delete({
      where: { id: prospectId },
    })
    return prospect
  }
}
