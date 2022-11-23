import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { Role } from '@prisma/client'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
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
  async updateRole(
    @Param('memberId') memberId: string,
    @Body() updateRoleDto: { role: Role },
  ) {
    const data = await this.membersService.updateRole(memberId, updateRoleDto)
    return data
  }

  @Post('/invite')
  async inviteMember(@Param('workspaceId') workspaceId: string, @GetUser() user: UserRecord, @Body() { email }) {
    const data = await this.membersService.inviteMember({ email, workspaceId, memberId: user.uid, userName: user.displayName })
    return data
  }

  @Post('/validate')
  async validateInvitees(@GetUser() user: UserRecord, @Body() { inviteId }) {
    const data = await this.membersService.validateInvitees(inviteId, user.uid)
    return data
  }
}
