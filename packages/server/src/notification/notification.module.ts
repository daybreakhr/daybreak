import { Module, forwardRef } from '@nestjs/common'
import { AffindaModule } from 'src/affinda/affinda.module'
import { AuthModule } from 'src/auth/auth.module'
import { AWSModule } from 'src/aws/aws.module'
import { PrismaService } from 'src/prisma.service'
import { NotificationService } from './notification.service'

@Module({
  imports: [AffindaModule, forwardRef(() => AuthModule), AWSModule],
  providers: [NotificationService, PrismaService],
  exports: [NotificationService],
})
export class NotificationModule {}
