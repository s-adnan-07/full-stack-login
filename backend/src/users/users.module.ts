import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Name, NameSchema, User, UserSchema } from 'src/schemas/user.schema'
import { UsersService } from './services/users.service'
import { UsersController } from './controllers/users.controller'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      // { name: Name.name, schema: NameSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
