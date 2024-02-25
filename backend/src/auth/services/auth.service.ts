import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { GetUserDto } from 'src/shared/dtos/get-user.dto'
import { UsersService } from 'src/users/services/users.service'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  async signIn({ email, password }: GetUserDto): Promise<any> {
    const user = await this.usersService.getUser(email)

    if (!user) throw new UnauthorizedException()
    if (user.password !== password) throw new UnauthorizedException()

    const { firstName, lastName, email: userEmail } = user
    return this.jwtService.sign({ firstName, lastName, userEmail })
  }
}
