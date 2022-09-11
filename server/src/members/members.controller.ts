import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { MembersService } from './members.service'

@Controller(':workspaceId/members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getAllMembers(@Param('workspaceId') workspaceId: string) {
    const data = await this.membersService.getAllMembers(workspaceId)
    return data
  }

  @Patch(':memberId')
  @UseGuards(AuthGuard)
  async updateRole(
    @Param('memberId') memberId: string,
    @Body() updateRoleDto: { role: Role },
    @GetUser() user: UserRecord,
  ) {
    const data = await this.membersService.updateRole(
      memberId,
      updateRoleDto,
      user,
    )

    return data
  }
}
