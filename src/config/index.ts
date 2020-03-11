import authConfig from './auth.config'
import accessControlConfig from './accessControl.config'
import corsConfig from './cors.config'
import dbConfig from './db.config'
import fileUploadConfig from './fileUpload.config'
import graphqlConfig from './graphql.config'
import graphqlAccessControlConfig from './graphqlAccessControl.config'
import httpRequestConfig from './httpRequest.config'
import loggerConfig from './logger.config'
import mainConfig from './main.config'
import rateLimitConfig from './rateLimit.config'
import redisConfig from './redis.config'
import swaggerConfig from './swagger.config'

export {
  authConfig,
  accessControlConfig,
  corsConfig,
  dbConfig,
  fileUploadConfig,
  graphqlConfig,
  graphqlAccessControlConfig,
  httpRequestConfig,
  loggerConfig,
  mainConfig,
  rateLimitConfig,
  redisConfig,
  swaggerConfig
}

export default [
  authConfig,
  accessControlConfig,
  corsConfig,
  dbConfig,
  fileUploadConfig,
  graphqlConfig,
  graphqlAccessControlConfig,
  httpRequestConfig,
  loggerConfig,
  mainConfig,
  rateLimitConfig,
  redisConfig
  // swaggerConfig
]
