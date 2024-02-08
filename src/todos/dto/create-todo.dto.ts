import { TodoStatus } from '../types/status';

export class Todo {
  constructor(
    public id: string,
    public boardId: string,
    public todoTitle: string,
    public todoDescription: string,
    public status: TodoStatus,
  ) {}
}
