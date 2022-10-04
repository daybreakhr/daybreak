import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import type { Location } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class LocationService {
  constructor(private prismaService: PrismaService) {}

  async getAll(workspaceId: string) {
    const locations = await this.prismaService.location.findMany({
      where: { workspaceId },
    })
    return locations
  }

  async create(
    workspaceId: string,
    createLocationDto: { name: string },
    uid: string,
  ) {
    const location = await this.prismaService.location.create({
      data: {
        name: createLocationDto.name,
        Workspace: { connect: { id: workspaceId } },
        Member: { connect: { uid } },
      },
    })
    return location
  }

  async update(locationId: string, updateLocationDto: Partial<Location>) {
    if (updateLocationDto) {
      const location = await this.prismaService.location.update({
        where: { id: locationId },
        data: updateLocationDto,
      })
      return location
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Request body is not available',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async delete(locationId: string) {
    const jobs = await this.prismaService.job.findMany({
      where: { locationId },
    })
    if (jobs.length) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Delete ${jobs.length} Job applications under this location first.`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }

    const location = await this.prismaService.location.delete({
      where: { id: locationId },
    })
    return location
  }
}
