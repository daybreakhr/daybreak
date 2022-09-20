import { Injectable } from '@nestjs/common'
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

  async delete(locationId: string) {
    const location = await this.prismaService.location.delete({
      where: { id: locationId },
    })
    return location
  }
}
