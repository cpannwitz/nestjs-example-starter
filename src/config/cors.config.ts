import { registerAs } from '@nestjs/config'

export default registerAs('cors', () => ({
  origin: [process.env.SERVER_URI, process.env.CLIENT_URI, 'http://localhost'],
  credentials: true
  // origin: [process.env.SERVER_URI, process.env.CLIENT_URI, 'http://localhost', '*'],
  // methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  // preflightContinue: false,
  // optionsSuccessStatus: 204,
  // allowedHeaders: ['Accept', 'Content-Type', 'Authorization']
}))
