import { Document } from 'mongoose';

export interface IBoard extends Document {
  readonly name: string;
}
