import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.NODE_ENV ? 'https://daybreakhr-c855d.web.app' : '*',
  })

  await app.listen(process.env.PORT ?? 8000)
}
bootstrap()
