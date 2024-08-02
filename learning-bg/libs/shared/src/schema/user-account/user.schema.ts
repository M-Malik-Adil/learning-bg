import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

import { AbstractSchema } from '../abstract.repo/abstract.schema';
import { UserRole } from '../../constants/enums';


@Schema({timestamps: true, versionKey: false})
export class User extends AbstractSchema {
  @Prop({type:String, required: true})
  name: string;

  @Prop({type:String, unique:true, required: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({type:String, default: UserRole.SUPER_ADMIN})
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);