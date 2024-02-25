import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Name, User } from 'src/schemas/user.schema'
import { CreateUserDto } from '../dtos/create-user.dto'
import { GetUserDto } from '../dtos/get-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    // @InjectModel(Name.name) private nameModel: Model<Name>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto)

    // Serializing user
    const { firstName, lastName, email } = await newUser.save()
    return { firstName, lastName, email }
  }

  getUser(getUserDto: GetUserDto) {
    const { email } = getUserDto
    return this.userModel.findOne({ email }).exec()
  }

  getAllUsers() {
    return this.userModel.find().exec()
  }
}
