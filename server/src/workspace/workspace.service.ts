import { S3 } from 'aws-sdk'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Workspace } from '@prisma/client'
import type { Express } from 'express'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class WorkspaceService {
  constructor(
    private prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getById(workspaceId: string) {
    const workspace = await this.prismaService.workspace.findUnique({
      where: { id: workspaceId },
    })
    return workspace
  }

  async updateWorkspace(
    workspaceId: string,
    updateWorkspaceDto: Partial<Workspace>,
    file?: Express.Multer.File,
  ) {
    let uploadResult: S3.ManagedUpload.SendData | undefined
    if (file) {
      const ext = file.mimetype.split('/')[1]
      const key = `organisation/${workspaceId}/logo.${ext}`
      uploadResult = await this.uploadS3(file.buffer, key)
    }

    const workspace = await this.prismaService.workspace.update({
      where: { id: workspaceId },
      data: { ...updateWorkspaceDto, logo: uploadResult?.Location },
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
      })
      .promise()

    return data
  }
}
