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
import { JWT_SECRET } from 'src/constants'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
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
