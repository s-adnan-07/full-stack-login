import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common'
import { UsersService } from '../services/users.service'
import { CreateUserDto } from '../dtos/create-user.dto'
import { UserExceptionFilter } from '../filters/user-exception.filter'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseFilters(UserExceptionFilter)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  // For testing
  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers()
  }
}
