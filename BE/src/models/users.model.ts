import { IUserDocument } from '@/interfaces/users.interface';
import mongoose, { Model } from 'mongoose';

const { Schema } = mongoose;

type IUserModel = Model<IUserDocument>;

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      trim: true,
      maxLength: 150,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

const UserModel = mongoose.model<IUserDocument, IUserModel>(DOCUMENT_NAME, userSchema);

export default UserModel;
