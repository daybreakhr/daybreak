import { Module } from '@nestjs/common'
import { InvitesService } from './invites.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  providers: [InvitesService, PrismaService],
  exports: [InvitesService]
})
export class InvitesModule {}
