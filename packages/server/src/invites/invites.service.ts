import { Injectable } from '@nestjs/common'
import { Role } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class InvitesService {
  constructor(private prismaService: PrismaService) {}

  async getAllInvites() {
    const invites = await this.prismaService.invitees.findMany({
      include: { Workspace: true, Member: true },
    })
    return invites
  }

  async createInvite(email: string, workspaceId: string, memberId: string) {
    const invite = await this.prismaService.invitees.create({
      data: {
        email,
        role: Role.member,
        expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        Workspace: { connect: { id: workspaceId } },
        Member: { connect: { uid: memberId } },
        },
        include: { Workspace: true, Member: true },
    })
    return invite
  }
}
