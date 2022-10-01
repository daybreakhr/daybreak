import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
    const jobs = await this.prismaService.job.findMany({
      where: { departmentId },
    })
    if (jobs.length) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Delete ${jobs.length} Job applications under this department first.`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    const department = await this.prismaService.department.delete({
      where: { id: departmentId },
    })
    return department
  }
}
