import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class TemplatesService {
  constructor(private prismaService: PrismaService) {}

  async getAllTemplates() {
    const templates = await this.prismaService.template.findMany()

    return templates
  }
}
