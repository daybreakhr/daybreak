import {
  Body,
  Controller,
  Delete,
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
import { UserRecord } from 'firebase-admin/auth'
import { AuthGuard } from 'src/auth/auth.guard'
import { GetUser } from 'src/auth/get-user.decorator'
import { Roles } from 'src/auth/roles.decorator'
import {
  CreateLocationDto,
  LocationDto,
  UpdateLocationDto,
} from './location.dto'
import { LocationService } from './location.service'

@ApiSecurity('access-key')
@ApiTags('Location')
@Controller('locations')
@UseGuards(AuthGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('')
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Create a Location' })
  @ApiCreatedResponse({ description: 'Created Succesfully', type: LocationDto })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @GetUser() user: UserRecord,
  ) {
    const data = await this.locationService.create(createLocationDto, user.uid)
    return data
  }

  @Patch(':id')
  @Roles(Role.admin)
  @ApiOperation({ summary: 'Update location' })
  @ApiOkResponse({
    description: 'location updated successfully',
    type: LocationDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Location not found' })
  @ApiBody({ type: UpdateLocationDto })
  async update(
    @Param('id') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
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
  async delete(@Param('id') locationId: string) {
    const data = await this.locationService.delete(locationId)
    return data
  }
}
