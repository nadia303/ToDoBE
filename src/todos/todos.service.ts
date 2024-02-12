import { TodoStatus } from './types/status';
import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UpdateTodoDto from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schema/todos.schema';
import { Board } from 'src/boards/schema/boards.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<Todo>,
    @InjectModel(Board.name) private boardModel: Model<Board>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const { boardId, title, description } = createTodoDto;
    if (!boardId || !title || !description) {
      throw new BadRequestException(
        'Invalid input data. All fields are required.',
      );
    }
    const findBoard = await this.boardModel.findById(boardId);
    if (!findBoard) {
      throw new HttpException('Board Not Found', 404);
    }
    const newTodo = new this.todoModel({
      boardId,
      title,
      description,
      status: TodoStatus.TODO,
    });

    try {
      const savedTodo = await newTodo.save();
      await findBoard.updateOne({
        $push: {
          todos: savedTodo._id,
        },
      });
      const { _id, title, description } = savedTodo;
      return { id: _id, title, description };
    } catch (error) {
      throw new BadRequestException(
        'Error creating todo. Check your input data.',
      );
    }
  }

  async patchById(id: string, todoData: UpdateTodoDto) {
    const result = await this.todoModel.findOneAndUpdate(
      { _id: id },
      { $set: todoData },
      { new: true },
    );
    return result;
  }

  async deleteById({ boardId, todoId }) {
    if (!boardId || !todoId) {
      throw new BadRequestException(
        'Invalid input data. All fields are required.',
      );
    }
    const findBoard = await this.boardModel.findById(boardId);
    if (!findBoard) {
      throw new HttpException('Board Not Found', 404);
    }
    const deletedTodo = await this.todoModel.findByIdAndDelete(todoId);
    await findBoard.updateOne({
      $pull: {
        todos: deletedTodo._id,
      },
    });

    return deletedTodo;
  }
}
