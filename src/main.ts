import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from 'nestjs-pino'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { SwaggerModule } from '@nestjs/swagger'
import swaggerConfig from './config/swagger.config'

// create NestJS server, apply middleware and utilities, start server async
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // apply custom logger (Pino)
  app.useLogger(app.get(Logger))

  // apply global validation via class-validator for all classes
  app.useGlobalPipes(new ValidationPipe())

  // get global config from config module
  const config = app.get(ConfigService)

  // add middleware with config
  const corsConfig = config.get('cors')
  const rateLimitConfig = config.get('rateLimit')
  app.enableCors(corsConfig)
  app.use(compression())
  app.use(helmet())
  app.use(rateLimit(rateLimitConfig))
  app.enableShutdownHooks()

  // apply Swagger api documentation
  SwaggerModule.setup('api', app, swaggerConfig(app))

  const port = config.get('system.port')
  const host = config.get('system.host')
  await app.listen(port, host)
}
bootstrap()
