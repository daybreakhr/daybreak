import { isEmpty } from 'lodash'
import type { Express } from 'express'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Role, Workspace } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { AWSS3Service } from 'src/aws/aws.s3.service'
import exists from 'src/utils/prisma.exists'
import { CreateWorkspaceDto } from './workspace.dto'

@Injectable()
export class WorkspaceService {
  constructor(
    private prismaService: PrismaService,
    private s3Service: AWSS3Service,
  ) {}

  async getAllWorkspaces() {
    const workspaces = await this.prismaService.workspace.findMany({})
    return workspaces
  }

  async getBySlugOrId(slug?: string, id?: string) {
    const query = {
      ...(slug ? { slug } : {}),
      ...(id ? { id } : {}),
    }

    if (isEmpty(query)) {
      const workspaces = await this.getAllWorkspaces()
      return workspaces
    }

    const workspace = await this.prismaService.workspace.findUnique({
      where: query,
      include: {
        Job: {
          include: {
            Department: true,
            Location: true,
          },
        },
      },
    })

    return workspace
  }

  async getCandidatesForWorkspace(workspaceId: string) {
    const candidates = await this.prismaService.candidate.findMany({
      where: { workspaceId },
      include: { Job: true, Feedback: true },
    })
    return candidates
  }

  async getDepartmentsForWorkspace(workspaceId: string) {
    const departments = await this.prismaService.department.findMany({
      where: { workspaceId },
    })
    return departments
  }

  async getEmailTemplateForWorkspace(workspaceId: string) {
    const emailTemplates = await this.prismaService.emailTemplate.findMany({
      where: { workspaceId },
    })
    return emailTemplates
  }

  async getJobsForWorkspace(workspaceId: string) {
    const jobs = await this.prismaService.job.findMany({
      where: { workspaceId },
      include: {
        Location: true,
        Department: true,
        _count: {
          select: { Candidate: true },
        },
      },
    })
    return jobs
  }

  async getLocationsForWorkspace(workspaceId: string) {
    const locations = await this.prismaService.location.findMany({
      where: { workspaceId },
    })
    return locations
  }

  async verifySlug(slug: string) {
    const slugExists = await exists(this.prismaService.workspace, {
      where: { slug },
    })
    return slugExists
  }

  async createWorkspace(createWorkspaceDto: CreateWorkspaceDto, uid: string) {
    // Check if any workspace is using that slug
    const slugExists = await this.verifySlug(createWorkspaceDto.slug)

    if (slugExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Slug already exists. Add a unique slug for your workspace',
        },
        HttpStatus.BAD_REQUEST,
      )
    } else {
      // create workspace
      const workspace = await this.prismaService.workspace.create({
        data: createWorkspaceDto,
      })

      // create member for the workspace
      await this.prismaService.member.create({
        data: {
          uid,
          role: Role.admin,
          Workspace: { connect: { id: workspace.id } },
        },
      })
      return workspace
    }
  }

  async uploadLogo(workspaceId: string, file: Express.Multer.File) {
    const key = `organisation/${workspaceId}/${file.originalname}`
    const uploadResult = await this.s3Service.uploadS3({
      file: file.buffer,
      key,
      mimetype: file.mimetype,
    })
    const workspace = await this.prismaService.workspace.update({
      where: { id: workspaceId },
      data: { logo: uploadResult.Location },
    })
    return workspace
  }

  async updateWorkspace(
    workspaceId: string,
    updateWorkspaceDto: Partial<Workspace>,
  ) {
    const workspace = await this.prismaService.workspace.update({
      where: { id: workspaceId },
      data: updateWorkspaceDto,
    })

    return workspace
  }
}
