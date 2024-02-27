import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { MONGO_PASSWORD, MONGO_USERNAME } from './constants'

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${process.env.HOST || 'localhost'}:27017/masterDB`,
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
