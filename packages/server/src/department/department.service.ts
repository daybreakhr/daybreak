import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import type { Department } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateDepartmentDto } from './department.dto'

@Injectable()
export class DepartmentService {
  constructor(private prismaService: PrismaService) {}

  async create(createDepartmentDto: CreateDepartmentDto, uid: string) {
    const { workspaceId, ...restPayload } = createDepartmentDto
    const department = await this.prismaService.department.create({
      data: {
        ...restPayload,
        Workspace: { connect: { id: workspaceId } },
        Member: { connect: { uid } },
      },
    })
    return department
  }

  async update(departmentId: string, updateDepartmentDto: Partial<Department>) {
    if (updateDepartmentDto) {
      const department = await this.prismaService.department.update({
        where: { id: departmentId },
        data: updateDepartmentDto,
      })
      return department
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
