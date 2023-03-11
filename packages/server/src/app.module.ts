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
import { FeedbackModule } from './feedback/feedback.module'
import { InvitesModule } from './invites/invites.module'
import { TemplatesModule } from './templates/templates.module'
import { NotificationModule } from './notification/notification.module'
import { AffindaModule } from './affinda/affinda.module'
import { ProspectModule } from './prospect/prospect.module'
import { CalendarModule } from './calendar/calendar.module'
import { EmailModule } from './email/email.module'
import { InterviewModule } from './interviews/interview.module'
import { PipelineModule } from './pipelines/pipeline.module'

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
        FIREBASE_CLIENT_ID: Joi.string(),
        FIREBASE_CLIENT_SECRET: Joi.string(),
        COOKIE_DOMAIN: Joi.string(),
        GOOGLE_ENCRYPT_TOKEN: Joi.string(),
      }),
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AffindaModule,
    AuthModule,
    AWSModule,
    CalendarModule,
    CandidateModule,
    DepartmentModule,
    EmailModule,
    FeedbackModule,
    InterviewModule,
    InvitesModule,
    JobsModule,
    LocationModule,
    MembersModule,
    NotificationModule,
    PipelineModule,
    ProspectModule,
    TemplatesModule,
    WorkspaceModule,
  ],
  providers: [PrismaService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware, AppLoggerMiddleware).forRoutes('*')
  }
}
