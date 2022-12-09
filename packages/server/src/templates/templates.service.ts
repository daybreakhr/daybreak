import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TemplatesService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async getAllTemplates(workspaceId: string) {
    const members = await this.prismaService.template.findMany({
      where: { workspaceId },
    })

    return members
  }
}
