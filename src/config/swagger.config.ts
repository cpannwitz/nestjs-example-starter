import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export default (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('NestJS Example Starter')
    .setDescription('Description')
    .setVersion(process.env.API_VERSION || 'v1')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  return document
}
