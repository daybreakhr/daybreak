import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateReferralDto } from './referral.dto'

@Injectable()
export class ReferralService {
  constructor(private prismaService: PrismaService) {}

  async createReferral(createReferralDto: CreateReferralDto) {
    const { jobId, uid, ...rest } = createReferralDto
    const referral = await this.prismaService.referral.create({
      data: {
        ...rest,
        Member: { connect: { uid } },
        Job: { connect: { id: jobId } },
      },
    })

    return referral
  }

  async deleteReferral(id: string) {
    const referral = await this.prismaService.referral.delete({ where: { id } })

    return referral
  }
}
