import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

// place in env file
const allowedHosts = ['http://localhost:5173']

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  // To enable requests from forntend
  app.enableCors({ origin: allowedHosts })

  await app.listen(3000)
}
bootstrap()
