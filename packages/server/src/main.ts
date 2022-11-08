import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL, process.env.BOARDS_URL]
        : '*',
  })

  await app.listen(process.env.PORT ?? 8000)
}
bootstrap()
