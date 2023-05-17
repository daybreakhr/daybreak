import { APP_GUARD } from '@nestjs/core'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import * as Joi from 'joi'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

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
import { AWSModule } from './aws/aws.module'
import { FeedbackModule } from './feedback/feedback.module'
import { InvitesModule } from './invites/invites.module'
import { NotificationModule } from './notification/notification.module'
import { AffindaModule } from './affinda/affinda.module'
import { ProspectModule } from './prospect/prospect.module'
import { CalendarModule } from './calendar/calendar.module'
import { EmailModule } from './email/email.module'
import { InterviewModule } from './interviews/interview.module'
import { SlackModule } from './slack/slack.module'
import { ReferralsModule } from './referral/referral.module'
import { EmailTemplatesModule } from './email-templates/email-templates.module'

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
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({ context: 'HTTP' }),
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true },
        },
      },
    }),
    AffindaModule,
    AuthModule,
    AWSModule,
    CalendarModule,
    CandidateModule,
    DepartmentModule,
    EmailModule,
    EmailTemplatesModule,
    FeedbackModule,
    InterviewModule,
    InvitesModule,
    JobsModule,
    LocationModule,
    MembersModule,
    NotificationModule,
    ProspectModule,
    SlackModule,
    WorkspaceModule,
    ReferralsModule,
  ],
  providers: [PrismaService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
