import { Inject } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../services/auth.service'

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string) {
    return this.authService.signIn({ email, password })
  }
}
