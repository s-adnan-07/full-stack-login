import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/services/users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas/user.schema'
import { AuthController } from './controllers/auth.controller'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JWT_SECRET, TOKEN_ALIVE_TIME } from 'src/constants'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || JWT_SECRET,
      signOptions: {
        expiresIn: process.env.TOKEN_ALIVE_TIME || TOKEN_ALIVE_TIME,
      },
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USERS_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
