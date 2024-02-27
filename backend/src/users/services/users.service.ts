import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from 'src/schemas/user.schema'
import { CreateUserDto } from 'src/shared/dtos/create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto)

    // Serializing user
    const { firstName, lastName, email } = await newUser.save()
    return { firstName, lastName, email }
  }

  // This will be used by auth service to authenticate user
  // So dont include a route for this but keep the service
  // Removed getUserDto coz that will be handled by auth route
  async getUser(email: string) {
    return this.userModel.findOne({ email }).exec()
  }
}
