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
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { Department, Role } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { Roles } from 'src/auth/roles.decorator'
import { DepartmentDto } from './department.dto'
import { DepartmentService } from './department.service'

@ApiSecurity('access-key')
@ApiTags('Department')
@Controller(':workspaceId/department')
@UseGuards(AuthGuard)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Departments by Workspace' })
  @ApiOkResponse({
    description: 'Departments were returned successfully',
    type: [DepartmentDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAll(@Param('workspaceId') workspaceId: string) {
    const data = await this.departmentService.getAll(workspaceId)
    return data
  }

  @Post('')
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Create Department' })
  @ApiOkResponse({
    description: 'department created successfully',
    type: DepartmentDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
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
  @ApiOperation({ summary: 'Update Department' })
  @ApiOkResponse({
    description: 'department updated successfully',
    type: DepartmentDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Member not found' })
  @ApiBody({ type: DepartmentDto })
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
  @ApiOperation({ summary: 'Delete Department' })
  @ApiOkResponse({
    description: 'department deleted successfully',
    type: DepartmentDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Department not found' })
  async delete(@Param('id') departmentId: string) {
    const data = await this.departmentService.delete(departmentId)
    return data
  }
}
