import { APP_GUARD } from '@nestjs/core'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import * as Joi from 'joi'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { AuthMiddleware } from './auth/auth.middleware'
import { PrismaService } from './prisma.service'
import { MembersModule } from './members/members.module'
import { RolesGuard } from './auth/roles.guard'
import { DepartmentModule } from './department/department.module'
import { LocationModule } from './location/location.module'
import { JobsModule } from './jobs/jobs.module'
import { WorkspaceModule } from './workspace/workspace.module'
import { CandidateModule } from './candidate/candidate.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),
        AWS_REGION: Joi.string(),
        AWS_ACCESS_KEY: Joi.string(),
        AWS_SECRET_ACCESS_KEY: Joi.string(),
        AWS_BUCKET_NAME: Joi.string(),
        FIREBASE_PROJECT_ID: Joi.string(),
        FIREBASE_CLIENT_EMAIL: Joi.string(),
        FIREBASE_PRIVATE_KEY: Joi.string(),
      }),
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
    }),
    AuthModule,
    MembersModule,
    DepartmentModule,
    LocationModule,
    JobsModule,
    WorkspaceModule,
    CandidateModule,
  ],
  providers: [PrismaService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
