import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JWT_SECRET } from 'src/constants'

// Strategy to verify the jwt that is sent
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    })
  }

  // This method is called if jwt is verified
  // Payload is data signed in authservice
  validate(payload: any) {
    console.log(payload)
    return payload
  }
}
