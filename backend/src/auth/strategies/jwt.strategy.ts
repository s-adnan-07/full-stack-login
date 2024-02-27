import { Logger } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JWT_SECRET } from 'src/constants'
import { JwtResponse } from 'src/shared/dtos/jwt-response'

// Strategy to verify the jwt that is sent
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || JWT_SECRET,
    })
  }

  private readonly logger = new Logger(JwtStrategy.name)

  // This method is called if jwt is verified
  // Payload is data signed in authservice
  validate(payload: JwtResponse) {
    this.logger.log(`JWT successfully validated for '${payload.userEmail}'`)
    return payload
  }
}
