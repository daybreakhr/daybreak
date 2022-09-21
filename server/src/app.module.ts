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

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number(),
        FIREBASE_PROJECT_ID: Joi.string(),
        FIREBASE_CLIENT_EMAIL: Joi.string(),
        FIREBASE_PRIVATE_KEY: Joi.string(),
      }),
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthModule,
    MembersModule,
    DepartmentModule,
    LocationModule,
    JobsModule,
  ],
  providers: [PrismaService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
