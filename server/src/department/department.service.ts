import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class DepartmentService {
  constructor(private prismaService: PrismaService) {}

  async getAll(workspaceId: string) {
    const departments = await this.prismaService.department.findMany({
      where: { workspaceId },
    })
    return departments
  }

  async create(
    workspaceId: string,
    createDepartmentDto: { name: string },
    uid: string,
  ) {
    const department = await this.prismaService.department.create({
      data: {
        name: createDepartmentDto.name,
        Workspace: { connect: { id: workspaceId } },
        Member: { connect: { uid } },
      },
    })
    return department
  }

  async delete(departmentId: string) {
    const department = await this.prismaService.department.delete({
      where: { id: departmentId },
    })
    return department
  }
}
