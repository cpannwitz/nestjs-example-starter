import { Options } from 'express-rate-limit'
import { registerAs } from '@nestjs/config'

// TODO: add redis for memorystorage

export default registerAs(
  'rateLimit',
  () =>
    ({
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      skipFailedRequests: true
    } as Options)
)
