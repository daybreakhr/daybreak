import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { PrismaService } from 'src/prisma.service'
import { AWSModule } from 'src/aws/aws.module'
import { MembersController } from './members.controller'
import { MembersService } from './members.service'

@Module({
  imports: [AuthModule, FirebaseModule, AWSModule],
  controllers: [MembersController],
  providers: [MembersService, PrismaService],
  exports: [MembersService],
})
export class MembersModule {}
