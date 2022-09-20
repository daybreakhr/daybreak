import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import type { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { Roles } from 'src/auth/roles.decorator'
import { LocationService } from './location.service'

@Controller(':workspaceId/location')
@UseGuards(AuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('')
  async getAll(@Param('workspaceId') workspaceId: string) {
    const data = await this.locationService.getAll(workspaceId)
    return data
  }

  @Post('')
  @Roles('admin')
  async create(
    @Param('workspaceId') workspaceId: string,
    @Body() createLocationDto: { name: string },
    @GetUser() user: UserRecord,
  ) {
    const data = await this.locationService.create(
      workspaceId,
      createLocationDto,
      user.uid,
    )
    return data
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') locationId: string) {
    const data = await this.locationService.delete(locationId)
    return data
  }
}
