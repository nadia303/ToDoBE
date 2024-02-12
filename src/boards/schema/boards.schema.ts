import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Todo } from 'src/todos/schema/todos.schema';

@Schema()
export class Board {
  @Prop()
  name: string;

  @Prop({ type: [{ type: 'ObjectId', ref: Todo.name }] })
  todos: string[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
