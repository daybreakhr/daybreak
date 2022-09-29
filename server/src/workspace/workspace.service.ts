import { Injectable } from '@nestjs/common'
import { Workspace } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class WorkspaceService {
  constructor(private prismaService: PrismaService) {}

  async getById(workspaceId: string) {
    const workspace = await this.prismaService.workspace.findUnique({
      where: { id: workspaceId },
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
