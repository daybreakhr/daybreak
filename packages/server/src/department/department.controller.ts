import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Department, Role } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { Roles } from 'src/auth/roles.decorator'
import { DepartmentService } from './department.service'

@Controller(':workspaceId/department')
@UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('')
  async getAll(@Param('workspaceId') workspaceId: string) {
    const data = await this.departmentService.getAll(workspaceId)
    return data
  }

  @Post('')
  @Roles(Role.admin)
  async create(
    @Param('workspaceId') workspaceId: string,
    @Body() createDepartmentDto: { name: string },
    @GetUser() user: UserRecord,
  ) {
    const data = await this.departmentService.create(
      workspaceId,
      createDepartmentDto,
      user.uid,
    )
    return data
  }

  @Patch(':id')
  @Roles(Role.admin)
  async update(
    @Param('id') departmentId: string,
    @Body() updateDepartmentDto: Partial<Department>,
  ) {
    const data = await this.departmentService.update(
      departmentId,
      updateDepartmentDto,
    )
    return data
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') departmentId: string) {
    const data = await this.departmentService.delete(departmentId)
    return data
  }
}
