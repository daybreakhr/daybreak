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
import { AppLoggerMiddleware } from './logger.middleware'
import { AWSModule } from './aws/aws.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),
        AWS_S3_ACCESS_KEY_ID: Joi.string(),
        AWS_S3_SECRET_ACCESS_KEY: Joi.string(),
        AWS_S3_BUCKET: Joi.string(),
        AWS_SES_ACCESS_KEY_ID: Joi.string(),
        AWS_SES_SECRET_ACCESS_KEY: Joi.string(),
        AWS_SES_HOST: Joi.string(),
        AWS_SES_PORT: Joi.number(),
        FIREBASE_PROJECT_ID: Joi.string(),
        FIREBASE_CLIENT_EMAIL: Joi.string(),
        FIREBASE_PRIVATE_KEY: Joi.string(),
      }),
      envFilePath: ['.env.development.local', '.env.production.local'],
      isGlobal: true,
    }),
    AuthModule,
    MembersModule,
    DepartmentModule,
    LocationModule,
    JobsModule,
    WorkspaceModule,
    CandidateModule,
    AWSModule,
  ],
  providers: [PrismaService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware, AppLoggerMiddleware).forRoutes('*')
  }
}
