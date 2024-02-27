import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { FRONT_END, PORT } from './constants'

async function bootstrap() {
  // const allowedHosts = [process.env.FRONT_END || FRONT_END]
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')

  // To enable requests from forntend
  // app.enableCors({ origin: allowedHosts })
  app.enableCors()

  await app.listen(process.env.PORT || PORT)
}
bootstrap()
