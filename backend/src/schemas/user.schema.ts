import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
class Name {
  @Prop({ required: true })
  first: string

  @Prop()
  last?: string
}

const NameSchema = SchemaFactory.createForClass(Name)

@Schema()
export class User {
  @Prop({ type: NameSchema })
  name: Name

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop()
  created_at?: Date

  @Prop()
  updated_at?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
