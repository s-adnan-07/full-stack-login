import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Name {
  @Prop({ required: true })
  first: string

  @Prop()
  last?: string
}

export const NameSchema = SchemaFactory.createForClass(Name)

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string

  @Prop()
  lastName?: string

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

UserSchema.pre('save', function () {
  this.created_at ??= new Date()
  this.updated_at = new Date()
})
