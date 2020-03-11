import { JwtModuleOptions } from '@nestjs/jwt'
import { StrategyOptionsWithRequest as GoogleOptions } from 'passport-google-oauth20'
import { registerAs } from '@nestjs/config'

export enum AuthProvider {
  GOOGLE = 'google',
  GOOGLETOKEN = 'googletoken',
  JWT = 'JWT'
}

export default registerAs('auth', () => ({
  clientURI: process.env.CLIENT_URI || 'http://localhost:3000',
  loginSuccessUrl: (process.env.CLIENT_URI || 'http://localhost:3000') + '/login/success',
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '15m'
    }
  } as JwtModuleOptions,
  jwtRefresh: {
    secret: process.env.JWT_REFRESH_SECRET,
    signOptions: {
      expiresIn: '7d'
    }
  } as JwtModuleOptions,
  google: {
    clientID: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_KEY,
    callbackURL: process.env.SERVER_URI + '/auth/google/callback',
    scope: ['email', 'profile', 'openid']
    // passReqToCallback: true,
    // sessionKey: ''
  } as GoogleOptions,
  googletoken: {
    clientID: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_KEY
  }
}))
