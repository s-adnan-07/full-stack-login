import { IsEmail, IsNotEmpty } from 'class-validator'

export class GetUserDto {
  @IsNotEmpty()
  email: string
}
