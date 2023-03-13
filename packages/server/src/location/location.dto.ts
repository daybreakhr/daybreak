import { PartialType } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class Location {
  /**
   * Name of the location
   * @example 'Hyderabad'
   */
  @IsString()
  name: string

  /**
   * Id of workspace
   * @example '9a3382e7332fac263632'
   */
  @IsString()
  workspaceId: string
}

export class CreateLocation extends Location {}

export class UpdateLocation extends PartialType(Location) {}
