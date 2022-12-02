import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { FirebaseModule } from 'src/firebase/firebase.module'
import { DepartmentController } from './department.controller'
import { DepartmentService } from './department.service'

@Module({
  imports: [FirebaseModule],
  controllers: [DepartmentController],
  providers: [AuthService, DepartmentService, PrismaService],
})
export class DepartmentModule {}
