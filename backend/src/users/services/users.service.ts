import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Name, User } from 'src/schemas/user.schema'
import { CreateUserDto } from '../dtos/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    // @InjectModel(Name.name) private nameModel: Model<Name>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, ...userDetails } = createUserDto

    const newName: Name = {
      first: firstName,
      last: lastName,
    }

    const newUser = new this.userModel({
      name: newName,
      ...userDetails,
    })

    return newUser.save()
  }
}
