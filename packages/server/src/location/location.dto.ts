import { PartialType } from '@nestjs/swagger'

export class CreateLocationDto {
  name: string
  workspaceId: string
}

export class LocationDto extends CreateLocationDto {
  id: string
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export class UpdateLocationDto extends PartialType(LocationDto) {}
