import { model, Schema } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  chatId: number;
  avatarUrl: string;
  modelUrl: string;
  rpmId: string;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
  chatId: {
    type: Number,
    required: true,
    unique: true
  },
  avatarUrl: {
    type: String,
    required: false
  },
  modelUrl: {
    type: String,
    required: false
  },
  rpmId: {
    type: String,
    required: true,
    unique: true
  }
}, {versionKey: false});

export default model<IUser>('user', userSchema);