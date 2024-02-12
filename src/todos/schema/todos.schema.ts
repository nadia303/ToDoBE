import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TodoStatus } from '../types/status';

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: TodoStatus, default: TodoStatus.TODO })
  status: TodoStatus;

  @Prop({ type: 'ObjectId', ref: 'Board' })
  boardId: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
