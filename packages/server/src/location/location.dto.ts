import { ApiProperty, PartialType } from '@nestjs/swagger'
import { Role } from '@prisma/client'

export class Location {
  @ApiProperty({
    example: 'Hyderabad',
    description: 'Name of the location',
    required: true
  })
  name: string

  @ApiProperty({
    example: '9a3382e7332fac263632',
    description: 'id of workspace',
    required: true
  })
  workspaceId: string
}

export class CreateLocation extends PartialType(Location){}

export class UpdateLocation extends PartialType(Location){}

