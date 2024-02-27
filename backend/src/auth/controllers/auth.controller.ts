import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { GetUserDto } from 'src/shared/dtos/get-user.dto'
import { LocalGuard } from '../guards/local.guard'
import { JwtGuard } from '../guards/jwt.guard'
import { Request } from 'express'
import { UserExceptionFilter } from 'src/shared/filters/user-exception.filter'
import { CreateUserDto } from 'src/shared/dtos/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @Post('register')
  @UseFilters(UserExceptionFilter)
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  // Passport will attach jwt to the request once we pass the local guard test
  @Post('login')
  @UseGuards(LocalGuard)
  signIn(@Req() req: Request) {
    const response = {
      statusCode: HttpStatus.OK,
      token: req.user,
    }

    return response
  }

  // Protected Endpoint
  // Checks jwt before granting access
  // This is used to check status of jwt if its expired or not
  // Once token is validated get
  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    return req.user
  }
}
