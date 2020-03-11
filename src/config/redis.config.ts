import { registerAs } from '@nestjs/config'
import { RedisModuleOptions } from 'nestjs-redis'

export default registerAs(
  'redis',
  () =>
    ({
      url: process.env.REDIS_URL
    } as RedisModuleOptions)
)
