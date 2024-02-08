import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TodoStatus } from '../types/status';

export type CatDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop({ required: true })
  boardId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: Object.values(TodoStatus),
    default: TodoStatus.TODO,
  })
  status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
