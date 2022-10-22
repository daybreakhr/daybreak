import { Module } from '@nestjs/common'
import { DepartmentService } from './department.service'
import { DepartmentController } from './department.controller'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'

@Module({
  imports: [FirebaseModule],
  controllers: [DepartmentController],
  providers: [AuthService, DepartmentService, PrismaService],
})
export class DepartmentModule {}
