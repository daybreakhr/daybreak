import { S3 } from 'aws-sdk'
import type { Express } from 'express'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Workspace } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class WorkspaceService {
  constructor(
    private prismaService: PrismaService,
    private readonly configService: ConfigService,
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
    const uploadResult = await this.uploadS3(file.buffer, key)
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

  async uploadS3(file: Buffer, key: string) {
    const s3 = new S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    })

    const data = await s3
      .upload({
        Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
        Body: file,
        Key: key,
        ContentDisposition: 'inline',
      })
      .promise()

    return data
  }
}
