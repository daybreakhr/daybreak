import { NestFactory } from '@nestjs/core'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  app.enableCors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            process.env.FRONTEND_URL,
            process.env.FRONTEND_PREVIEW_URL,
            process.env.BOARDS_URL,
          ]
        : '*',
  })

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription(
      'This is the complete API documentation for the Daybreak HR',
    )
    .setVersion('v1')
    .addApiKey(
      {
        type: 'apiKey', // this should be apiKey
        name: 'Authorization', // this is the name of the key you expect in header
        in: 'header',
      },
      'access-key', // this is the name to show and used in swagger
    )
    .build()

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Daybreakhr API Docs',
  }

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, customOptions)

  await app.listen(process.env.PORT ?? 8000, () =>
    // eslint-disable-next-line no-console
    console.info(
      `Nest application started on ${process.env.PORT ?? 8000} port`,
    ),
  )
}
bootstrap()
