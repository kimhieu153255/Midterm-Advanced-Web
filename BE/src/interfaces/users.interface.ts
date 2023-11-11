import { Document } from 'mongoose';

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserDocument extends Document {
  username: string;
  email: string;
  password: string;
  phone: string;
  status: boolean;
}
