
import { MODEL } from "./constants/models";
import {User, UserSchema} from './schema'

export const DbModels = [
    {
        name: User.name,
        schema: UserSchema,
        collection: MODEL.USER
      },
]