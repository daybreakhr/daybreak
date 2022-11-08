import type { Express } from 'express'
import { Injectable } from '@nestjs/common'
import type { Workspace } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { S3Service } from 'src/s3.service'

@Injectable()
export class WorkspaceService {
  constructor(
    private prismaService: PrismaService,
    private s3Service: S3Service,
  ) {}

  async getAllWorkspaces() {
    const workspaces = await this.prismaService.workspace.findMany({})
    return workspaces
  }

  async getBySlug(slug: string) {
    const workspace = await this.prismaService.workspace.findUnique({
      where: { slug },
      include: { Job: true },
    })
    return workspace
  }

  async uploadLogo(workspaceId: string, file: Express.Multer.File) {
    const key = `organisation/${workspaceId}/${file.originalname}`
    const uploadResult = await this.s3Service.uploadS3(file, key)
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
