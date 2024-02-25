import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { GetUserDto } from 'src/shared/dtos/get-user.dto'
import { LocalGuard } from '../guards/local.guard'
import { JwtGuard } from '../guards/jwt.guard'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  // Passport will attach jwt to the request once we pass the local guard test
  @Post('login')
  @UseGuards(LocalGuard)
  signIn(@Req() req: Request) {
    return req.user
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
