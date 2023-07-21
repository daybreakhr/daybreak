import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'
import {
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiNotFoundResponse,
  ApiSecurity,
  ApiBody,
} from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { MemberDto, UpdateMemberDto, AddAppBody } from './members.dto'
import { MembersService } from './members.service'

@ApiSecurity('access-key')
@ApiTags('Member')
@Controller(':workspaceId/members')
@UseGuards(AuthGuard)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Members By Workspace' })
  @ApiOkResponse({
    description: 'Members were returned successfully',
    type: [MemberDto],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAllMembers(@Param('workspaceId') workspaceId: string) {
    const data = await this.membersService.getAllMembers(workspaceId)
    return data
  }

  @Patch(':memberId')
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Update Member' })
  @ApiOkResponse({
    description: 'member updated successfully',
    type: MemberDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Member not found' })
  @ApiBody({ type: UpdateMemberDto })
  async updateMember(
    @Param('memberId') memberId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const data = await this.membersService.updateMember(
      memberId,
      updateMemberDto,
    )
    return data
  }

  @Post(':memberId/apps')
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Add App to Member' })
  @ApiOkResponse({
    description: 'Added app to member successfully',
    type: MemberDto,
  })
  @ApiBody({ type: AddAppBody })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Member not found' })
  async addApp(
    @Param('memberId') memberId: string,
    @Body() { appName, isInstalled }: AddAppBody,
  ) {
    const data = await this.membersService.addApp(
      memberId,
      appName,
      isInstalled,
    )
    return data
  }
}
