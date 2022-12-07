import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { MembersService } from './members.service'

@Controller(':workspaceId/members')
@UseGuards(AuthGuard)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('')
  async getAllMembers(@Param('workspaceId') workspaceId: string) {
    const data = await this.membersService.getAllMembers(workspaceId)
    return data
  }

  @Patch(':memberId')
  @Roles(Role.admin)
  async updateMember(
    @Param('memberId') memberId: string,
    @Body() updateMemberDto: { role: Role },
  ) {
    const data = await this.membersService.updateMember(
      memberId,
      updateMemberDto,
    )
    return data
  }
}
