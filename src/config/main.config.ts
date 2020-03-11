import { registerAs } from '@nestjs/config'

export default () =>
  registerAs('system', () => ({
    port: parseInt(process.env.PORT || '') || 4000,
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: process.env.NODE_ENV || 'develop',
    serverURI: process.env.SERVER_URI || 'http://localhost:4000',
    clientURI: process.env.CLIENT_URI || 'http://localhost:3000'
  }))
