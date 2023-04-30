import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthModule } from 'src/auth/auth.module'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { DepartmentController } from './department.controller'
import { DepartmentService } from './department.service'

@Module({
  imports: [FirebaseModule, AuthModule],
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaService],
})
export class DepartmentModule {}
