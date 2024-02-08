import { Document } from 'mongoose';
import { TodoStatus } from '../types/status';

export interface ITodo extends Document {
  readonly title: string;
  readonly description: string;
  readonly status: TodoStatus;
  readonly boardId: string;
}
