import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { GetUserDto } from 'src/shared/dtos/get-user.dto'
import { UsersService } from 'src/users/services/users.service'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/shared/dtos/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(AuthService.name)

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword)
  }

  async signUp(createUserDto: CreateUserDto) {
    // just hash password and call usersservice

    const { password, ...newUser } = createUserDto
    const hashedPassword = await this.hashPassword(password)

    const { firstName } = await this.usersService.createUser({
      ...newUser,
      password: hashedPassword,
    })

    this.logger.log(`User '${firstName}' created in database`)

    return {
      statusCode: HttpStatus.CREATED,
      message: `User '${firstName}' created successfully`,
    }
  }

  async signIn({ email, password }: GetUserDto): Promise<any> {
    const user = await this.usersService.getUser(email)

    if (!user) {
      this.logger.error(`User with email '${email}' does not exist!`)
      throw new UnauthorizedException()
    }

    const passwordsMatch = await this.comparePasswords(password, user.password)
    if (!passwordsMatch) {
      this.logger.error(`Incorrect password entered for user '${email}'!`)
      throw new UnauthorizedException()
    }

    const { firstName, lastName, email: userEmail } = user
    this.logger.log(`Successfully retrieved user '${userEmail}'`)

    return this.jwtService.sign({ firstName, lastName, userEmail })
  }
}
