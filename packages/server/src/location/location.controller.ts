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
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiSecurity,
} from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { CreateLocation, Location, UpdateLocation } from './location.dto'
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { Roles } from 'src/auth/roles.decorator'
import { LocationService } from './location.service'

@ApiSecurity('access-key')
@ApiTags('Location')
@Controller(':workspaceId/location')
@UseGuards(AuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all Locations for a workspace' })
  @ApiOkResponse({
    description: 'Locations were returned successfully',
    type: [Location],
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async getAll(@Param('workspaceId') workspaceId: string): Promise<Location[]> {
    const data = await this.locationService.getAll(workspaceId)
    return data
  }

  @Post('')
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Create a Location' })
  @ApiCreatedResponse({ description: 'Created Succesfully', type: Location })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(
    @Param('workspaceId') workspaceId: string,
    @Body() createLocationDto: CreateLocation,
    @GetUser() user: UserRecord,
  ): Promise<Location> {
    const data = await this.locationService.create(
      workspaceId,
      createLocationDto,
      user.uid,
    )
    return data
  }

  @Patch(':id')
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Update location' })
  @ApiOkResponse({
    description: 'location updated successfully',
    type: Location,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBody({ type: UpdateLocation })
  async update(
    @Param('id') locationId: string,
    @Body() updateLocationDto: UpdateLocation,
  ): Promise<Location> {
    const data = await this.locationService.update(
      locationId,
      updateLocationDto,
    )
    return data
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete location' })
  @ApiOkResponse({ description: 'location deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'location not found' })
  async delete(@Param('id') locationId: string): Promise<Location> {
    const data = await this.locationService.delete(locationId)
    return data
  }
}
