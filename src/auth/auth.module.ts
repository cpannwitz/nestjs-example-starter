import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './strategies/google.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService, ConfigModule } from '@nestjs/config'
import { UsersModule } from '../users/users.module'
import { UsersService } from '../users/users.service'
import { AuthResolver } from './auth.resolver'
import { GoogleTokenStrategy } from './strategies/googleToken.strategy'

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('auth.jwt') || {}
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    UsersService,
    GoogleStrategy,
    GoogleTokenStrategy,
    JwtStrategy
  ]
})
export class AuthModule {}
